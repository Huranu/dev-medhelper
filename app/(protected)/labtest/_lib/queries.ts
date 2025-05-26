'use server';

import prisma  from '@/lib/prisma';

export async function saveLabTest(data: {
  userId: string;
  type: 'blood' | 'urine';
  summary: string;
  indicators: {
    label: string;
    description: string;
    refMin: number;
    refMax: number;
    unit: string;
  }[];
}) {
  try {
    const result = await prisma.labTest.create({
      data: {
        userId: data.userId,
        type: data.type,
        summary: data.summary,
        labTestIndicators: {
          create: data.indicators.map((i) => ({
            label: i.label,
            desc: i.description,
            refMin: i.refMin,
            refMax: i.refMax,
            unit: i.unit,
          })),
        },
      },
      include: {
        labTestIndicators: true,
      },
    });

    return result;
  } catch (error) {
    console.error('LabTest хадгалах үед алдаа:', error);
    throw new Error('Хадгалах үед алдаа гарлаа');
  }
}



export async function getLabTests(userId: string, type?: 'blood' | 'urine') {
  const where: any = { userId };

  if (type) {
    where.type = type;
  }

  const labTests = await prisma.labTest.findMany({
    where,
    include: {
      labTestIndicators: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return JSON.stringify(labTests);
}
