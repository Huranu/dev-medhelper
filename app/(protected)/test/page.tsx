'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createLabTest, getAllLabtests } from './queries';

interface FormData {
    type: 'blood' | 'urine';
    summary: string;
    indicators: Array<{
        label: string;
        desc: string;
        refMin: number;
        refMax: number;
        unit: string;
    }>;
}

export default function NewLabTestForm() {
    const [labtests, setLabtests] = useState<any>();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [serverError, setServerError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        const fetchALL = async () => {
            const result = await getAllLabtests();
            setLabtests(result);
        };

        fetchALL();
    }, []);

    console.log(labtests)

    const onSubmit = async (data: FormData) => {
        const formData = new FormData();
        formData.append('type', data.type);
        formData.append('summary', data.summary);
        formData.append('indicators', JSON.stringify(data.indicators));

        const result = await createLabTest(formData);

        if (result.error) {
            setServerError("Got err");
            setSuccess(null);
        } else {
            setSuccess('Lab test created successfully!');
            setServerError(null);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Lab Test</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="type" className="block">Test Type</label>
                    <select
                        id="type"
                        {...register('type', { required: 'Type is required' })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="blood">Blood</option>
                        <option value="urine">Urine</option>
                    </select>
                    {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                </div>

                <div>
                    <label htmlFor="summary" className="block">Summary</label>
                    <textarea
                        id="summary"
                        {...register('summary', { required: 'Summary is required' })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.summary && <p className="text-red-500">{errors.summary.message}</p>}
                </div>

                <div>
                    <label className="block">Indicators</label>
                    {/* Simplified: Add one indicator for demo; use dynamic fields for multiple */}
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Label"
                            {...register('indicators.0.label', { required: 'Label is required' })}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            {...register('indicators.0.desc', { required: 'Description is required' })}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="number"
                            step="0.1"
                            placeholder="Ref Min"
                            {...register('indicators.0.refMin', { required: 'Ref Min is required', valueAsNumber: true })}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="number"
                            step="0.1"
                            placeholder="Ref Max"
                            {...register('indicators.0.refMax', { required: 'Ref Max is required', valueAsNumber: true })}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Unit"
                            {...register('indicators.0.unit', { required: 'Unit is required' })}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                {serverError && <p className="text-red-500">{serverError}</p>}
                {success && <p className="text-green-500">{success}</p>}

                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                    Create Lab Test
                </button>
            </form>
        </div>
    );
}