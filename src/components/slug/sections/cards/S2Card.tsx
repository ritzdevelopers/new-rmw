function S2Card({ index }: { index: number }) {
    return (
        <div className="w-full flex h-[470px] ">
            <div className={`flex gap-14 h-full  w-full ${index % 2 === 0 ? "flex-row" : "justify-start  flex-row-reverse"}`}>
                {/* Left Side Container  */}
                <div className="w-[653px] h-full relative ">
                    <img src="/slug/s2-img.jpg" alt="" className="w-full h-full object-cover" />
                </div>

                {/* Right Side Container  */}
                <div className={`flex flex-col justify-center gap-4 max-w-[450px] ${index % 2 === 0 ? "text-start" : "text-end"}`}>
                    <h2 className="font-[700] text-[30px]">On-Page SEO</h2>
                    <p className="font-[400] text-[16px]">On-Page SEO is a meticulously planned and purposeful set of actions that empower digital persuasion embedded directly onto your website. This includes but is not limited to Content Optimization, Metadata, and structurization on every page. <br /><br />
                        This makes the page highly appealing for search engines and users. Ritz Media World doesn’t merely chase site rank. It can convert effortlessly.</p>
                </div>
            </div>
        </div>
    )
}

export default S2Card;