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
  const res = await fetch('/api/lab-tests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Шинжилгээ хадгалах үед алдаа гарлаа');
  }

  return res.json();
}

export async function getLabTests(userId: string, type: 'blood' | 'urine') {
  const res = await fetch(`/api/lab-tests?userId=${userId}&type=${type}`);

  if (!res.ok) {
    throw new Error('Шинжилгээ татах үед алдаа гарлаа');
  }

  return res.json();
}