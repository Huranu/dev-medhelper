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
