// app/actions/labtest.ts
'use server';

import { auth } from '@/app/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Input validation schema
const labTestSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  type: z.enum(['blood', 'urine'], { message: 'Invalid lab test type' }),
  summary: z.string().min(1, 'Summary is required'),
  indicators: z.array(
    z.object({
      label: z.string().min(1, 'Label is required'),
      desc: z.string().min(1, 'Description is required'),
      refMin: z.number().min(0, 'Reference minimum must be non-negative'),
      refMax: z.number().gt(1, 'Reference maximum must be greater than minimum'),
      unit: z.string().min(1, 'Unit is required'),
    })
  ).min(1, 'At least one indicator is required'),
});

export async function createLabTest(formData: FormData) {
  try {
    // Get session for authentication
    const session = await auth();
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    // Parse and validate form data
    const data = {
      userId: session.user.id,
      type: formData.get('type') as string,
      summary: formData.get('summary') as string,
      indicators: JSON.parse(formData.get('indicators') as string),
    };

    const validatedData = labTestSchema.safeParse(data);
    if (!validatedData.success) {
      return { error: validatedData.error.format() };
    }

    // Create LabTest with associated LabTestIndicators
    const labTest = await prisma.labTest.create({
      data: {
        userId: validatedData.data.userId,
        type: validatedData.data.type,
        summary: validatedData.data.summary,
        labTestIndicators: {
          create: validatedData.data.indicators.map((indicator) => ({
            label: indicator.label,
            desc: indicator.desc,
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

    return { data: labTest };
  } catch (error) {
    console.error('Error creating lab test:', error);
    return { error: 'Failed to create lab test' };
  }
}

export async function getAllLabtests( type?: 'blood' | 'urine') {
    try {
    const session = await auth();

      const labTests = await prisma.labTest.findMany({
        where:{userId: session?.user?.id},
        include: {
          labTestIndicators: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
        return JSON.stringify(labTests);
    } catch (error) {
        console.log(error)
        return 'Failed to create lab test' ;
    }
}