import Image from "next/image";
import { CiSearch } from "react-icons/ci";
function Section2() {

    const demoBlog = `<p class=\"MsoNormal\" style=\"margin:0px 0px 12px; line-height:150%; font-family:Calibri,sans-serif; font-size:16px;\"><span style=\"font-family:Poppins; font-size:18px;\">Welcome to our experimental testing blog designed to evaluate complex HTML rendering inside modern CMS editors. This article includes <strong>bold typography</strong>, <em>italic text</em>, hyperlinks, tables, lists, and various heading levels to simulate a real-world blog structure.</span></p>

<h1 style=\"font-family:Poppins; font-size:36px; color:#0b5394; margin:20px 0px;\"><strong>Ultimate HTML Testing Blog</strong></h1>

<p style=\"font-family:Poppins; font-size:18px; line-height:150%;\">When developers build blog editors or CMS systems, it is important to test how different HTML components behave. This includes formatting tags, embedded links, styled tables, and lists. For example, you can visit <a href=\"https://developer.mozilla.org\" target=\"_blank\" style=\"color:#1155cc;\">MDN Web Docs</a> to learn more about HTML standards.</p>

<h2 style=\"font-family:Poppins; font-size:28px; color:#0b5394; margin-top:30px;\"><strong>Key HTML Elements Used in Blogs</strong></h2>

<p style=\"font-family:Poppins; font-size:18px;\">Below are some common HTML elements used inside blog content:</p>

<ul style=\"font-family:Poppins; font-size:18px; line-height:160%;\">
<li><strong>Headings (H1-H6)</strong> for content hierarchy</li>
<li><strong>Paragraphs</strong> for readable text blocks</li>
<li><strong>Links</strong> to reference external resources</li>
<li><strong>Lists</strong> for structured information</li>
<li><strong>Tables</strong> for data comparison</li>
<li><strong>Images</strong> to enhance visual engagement</li>
</ul>

<h2 style=\"font-family:Poppins; font-size:28px; color:#0b5394; margin-top:30px;\"><strong>Ordered Steps Example</strong></h2>

<ol style=\"font-family:Poppins; font-size:18px; line-height:160%;\">
<li>Create a blog editor interface.</li>
<li>Allow rich text formatting.</li>
<li>Support HTML styling and inline CSS.</li>
<li>Test tables, lists, and embedded links.</li>
<li>Ensure mobile responsiveness.</li>
</ol>

<h2 style=\"font-family:Poppins; font-size:28px; color:#0b5394; margin-top:30px;\"><strong>Sample Data Table</strong></h2>

<table style=\"width:100%; border-collapse:collapse; font-family:Poppins; font-size:17px;\">
<thead>
<tr style=\"background:#f3f3f3;\">
<th style=\"border:1px solid #ccc; padding:10px;\">Feature</th>
<th style=\"border:1px solid #ccc; padding:10px;\">Purpose</th>
<th style=\"border:1px solid #ccc; padding:10px;\">Example</th>
</tr>
</thead>
<tbody>
<tr>
<td style=\"border:1px solid #ccc; padding:10px;\">Headings</td>
<td style=\"border:1px solid #ccc; padding:10px;\">Content structure</td>
<td style=\"border:1px solid #ccc; padding:10px;\">H1, H2, H3</td>
</tr>
<tr>
<td style=\"border:1px solid #ccc; padding:10px;\">Lists</td>
<td style=\"border:1px solid #ccc; padding:10px;\">Organized content</td>
<td style=\"border:1px solid #ccc; padding:10px;\">UL / OL</td>
</tr>
<tr>
<td style=\"border:1px solid #ccc; padding:10px;\">Links</td>
<td style=\"border:1px solid #ccc; padding:10px;\">Navigation</td>
<td style=\"border:1px solid #ccc; padding:10px;\">Anchor tag</td>
</tr>
</tbody>
</table>

<h2 style=\"font-family:Poppins; font-size:28px; color:#0b5394; margin-top:30px;\"><strong>Typography Styling</strong></h2>

<p style=\"font-family:Poppins; font-size:18px;\">Typography plays a major role in blog readability. Below are some examples:</p>

<p style=\"font-family:Poppins; font-size:20px;\"><strong>Bold Text Example</strong></p>
<p style=\"font-family:Poppins; font-size:20px;\"><em>Italic Text Example</em></p>
<p style=\"font-family:Poppins; font-size:20px; text-decoration:underline;\">Underlined Text Example</p>

<h2 style=\"font-family:Poppins; font-size:28px; color:#0b5394; margin-top:30px;\"><strong>Conclusion</strong></h2>

<p style=\"font-family:Poppins; font-size:18px; line-height:150%;\">This testing blog demonstrates how complex HTML content can be stored inside a JSON string and rendered inside CMS editors. It includes structured headings, styled tables, ordered and unordered lists, hyperlinks, and typography formatting. Developers can use such test data to ensure their blog rendering system works correctly across browsers and devices.</p>`
    return (
        <section className="w-full px-20 py-[70px] flex justify-center items-center">
            {/* Centered Align Container  */}
            <div className="w-full relative flex justify-between  items-start">

                {/* Left Side Container  */}
                <div className="max-w-[798px] w-full flex flex-col gap-8">
                    {/* Top Row  */}
                    <div className="w-full flex flex-col gap-4 pb-4 border-b border-[#D9D9D9]">
                        <div className="w-full relative h-[480px] overflow-hidden rounded-[5px]">
                            <Image src="/inner-demo-img.jpg" alt="Blog Image" fill className="object-cover w-full h-full" />
                        </div>

                        <div className="flex gap-4 w-full items-center">
                            <p className="font-[400] text-[16px]">29 May 2025</p>
                            <div className="w-[5px] h-[5px] bg-[#0F1640] rounded-full"></div>
                            <p className="font-[400] text-[14px]">Case Study</p>
                        </div>
                    </div>

                    {/* Bottom Row  */}
                    <div className="[&_table]:w-full [&_th]:border [&_th]:border-[#ccc] [&_th]:p-2.5 [&_td]:border [&_td]:border-[#ccc] [&_td]:p-2.5 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5" dangerouslySetInnerHTML={{ __html: demoBlog }} />
                </div>

                {/* Right Side Container  */}
                <div className="sticky top-28 max-w-[391px] w-full flex flex-col gap-14">
                    {/* Row 1 */}
                    <div className="w-full bg-[#F5F5F5] rounded-[10px] flex flex-col justify-center items-center text-center gap-4 py-8 px-4">
                        <p className="font-[600] text-[20px]">Search</p>
                        <div className="w-full h-[1px] bg-[#E5E4E3]"></div>
                        <div className="w-full bg-white h-[46px] border border-[#D0CFCF] rounded-full flex items-center gap-3 px-3 focus-within:border-[#0F1640]/40 focus-within:ring-2 focus-within:ring-[#0F1640]/10 transition-shadow">
                        <CiSearch className="w-[22px] h-[22px] text-[#484848] shrink-0" />
                        <input
                            type="text"
                            placeholder="Search blogs ..."
                            className="flex-1 h-full outline-none bg-transparent text-[14px] font-[400] text-[#484848] placeholder:text-[#484848]"
                        />
                    </div>
                    </div>

                    {/* Row 2 */}
                    <div className="w-full rounded-[10px] relative border border-[#E3E0E0]">
                        {/* Abs Div  */}
                        <div className="w-[170px] bg-white flex justify-center items-center text-center absolute -top-6 left-[50%] translate-x-[-50%]">
                            <p className="font-[600] text-[20px]">Categories</p>
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div></div>

                    {/* Row 4 */}
                    <div></div>
                </div>
            </div>
        </section>
    )
}

export default Section2;

//inner-demo-img.jpg