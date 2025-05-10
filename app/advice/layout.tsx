import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'Шинж тэмдэгийн үнэлгээ',
    description: 'Start symptom assessment',
}

export default function AdviceLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="">
            {/* Add navigation, layout wrapper, etc. if needed */}
            {children}
        </div>
    )
}
