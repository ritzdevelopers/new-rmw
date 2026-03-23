import WebsiteGateway from "@/components/gateway/WebsiteGateway";

export default function Service2Layout({ children }: { children: React.ReactNode }) {



    return (
        <>
        
        <WebsiteGateway />
            {children}
        </>
    )
}