'use server';

import { auth } from '@/app/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const labTestSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  type: z.enum(['blood', 'urine'], { message: 'Invalid lab test type' }),
  summary: z.string().min(1, 'Summary is required'),
  indicators: z.array(
    z.object({
      labelMn: z.string().min(1, 'LabelMn is required'),
      labelEn: z.string().min(1, 'LabelEn is required'),
      value: z.number(),
      desc: z.string().min(1, 'Description is required'),
      refMin: z.number().min(0, 'Reference minimum must be non-negative'),
      refMax: z.number().min(0, 'Reference maximum must be greater than minimum'),
      unit: z.string().min(1, 'Unit is required'),
    })
  ).min(1, 'At least one indicator is required'),
});

export async function createLabTest(formData: any) {
    console.log(formData)
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const data = {
      userId: session.user.id,
      type: 'blood',
      summary: formData.summary as string,
      indicators: formData.indicators,
    };

    const validatedData = labTestSchema.safeParse(data);
    if (!validatedData.success) {
      return { error: validatedData.error.format() };
    }

    const labTest = await prisma.labTest.create({
      data: {
        userId: validatedData.data.userId,
        type: validatedData.data.type,
        summary: validatedData.data.summary,
        labTestIndicators: {
          create: validatedData.data.indicators.map((indicator) => ({
            labelMn: indicator.labelMn,
            labelEn: indicator.labelEn,
            desc: indicator.desc,
            value: indicator.value,
            refMin: indicator.refMin,
            refMax: indicator.refMax,
            unit: indicator.unit,
          })),
        },
      },
      include: {
        labTestIndicators: true,
      },
    });
    console.log("RESULT ::::",labTest)
    return JSON.stringify(labTest);
  } catch (error) {
    console.error('Error creating lab test:', error);
    return { error: 'Failed to create lab test' };
  }
}

export async function getAllLabtests() {
    try {
        const labtests = await prisma.labTest.findMany();
        return JSON.stringify(labtests);
    } catch (error) {
        console.log(error)
        return { error: 'Failed to create lab test' };
    }
}