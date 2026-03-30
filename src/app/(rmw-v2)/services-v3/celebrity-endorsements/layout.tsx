export default function CelebrityEndorsementsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
            />
            <div className="w-full overflow-x-hidden">{children}</div>
        </>
    );
}