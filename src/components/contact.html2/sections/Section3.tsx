"use client";

// Same map as https://ritzmediaworld.com/contact.html (Ritz Media World – Noida)
const MAP_EMBED_URL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28052.52086266602!2d77.4128188!3d28.49264095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce530165cc6c1%3A0x9ea28df462e9945e!2sRitz%20Media%20World-Digital%20Marketing%20Agency%20in%20Noida%20%7C%20Social%20Media%20Agency%20in%20Noida%20%7C%20Newspaper%20%26%20Radio%20Ad%20Agency%20in%20Noida!5e0!3m2!1sen!2sin!4v1742542850888!5m2!1sen!2sin";

function Section3() {
    return (
        <section className="w-full bg-white lg:py-[70px] py-[0px]">
            <div className=" w-full">
                <div className="w-full overflow-hidden  aspect-video xl:aspect-auto xl:h-[600px]">
                    <iframe
                        src={MAP_EMBED_URL}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ritz Media World - 402-404, 4th floor Corporate Park, Tower A1, Sector 142, Noida"
                        className="w-full h-full min-h-[280px] xl:min-h-0"
                    />
                </div>
            </div>
        </section>
    );
}

export default Section3;
