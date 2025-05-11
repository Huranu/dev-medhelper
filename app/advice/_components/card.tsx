import React from 'react'

type CauseProps = {
    name: string
    advice: string,
    info: string
}

export default function Card({ cause, ind }: { cause: CauseProps, ind: number }) {
    return (
        <div className='flex flex-row justify-left items-center gap-12 w-full border-b border-gray-200 px-7 py-4'>
            <div className='text-4xl border border-gray-500 rounded-full w-12 h-12 text-center p-0.5 px-3'>{ind + 1}</div>
            <div>
                <div className='font-semibold text-xl'>{cause.name}</div>
                <div className='text-amber-500'>{cause.advice}</div>
                <div className='text-gray-500'>{cause.info}</div>
            </div>
        </div>
    )
}
