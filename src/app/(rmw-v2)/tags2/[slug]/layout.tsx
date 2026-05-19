import { Metadata } from "next";
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function Tags2Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}