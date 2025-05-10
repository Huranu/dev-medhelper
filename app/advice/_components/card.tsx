import React from 'react'

export default function Card() {
    return (
        <div className='flex flex-row justify-left items-center gap-12 w-full border-b border-gray-200 px-7 py-4'>
            <div className='text-4xl border border-gray-500 rounded-full w-12 h-12 text-center p-0.5'>1</div>
            <div>
                <div className='font-semibold text-xl'>Gastrooesophageal reflux disease</div>
                <div className='text-amber-500'>Seek medical advice</div>
                <div className='text-gray-500'>3 out of 10 people with these symptoms had this condition.</div>
            </div>
        </div>
    )
}
