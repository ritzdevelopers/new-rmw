export type ServiceSecondMeta = {
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    link: string | null;
};

function getPublicOrigin(): string {
    const raw =
        process.env.NEXT_PUBLIC_BASE_URL ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
        "http://localhost:3000";
    return raw.replace(/\/$/, "");
}

/**
 * Fetches SEO metadata for a `service_second` row where `link` matches (e.g. slug segment).
 * Calls GET /api/service-second/meta?link=...
 */
export async function fetchMeta(link: string): Promise<ServiceSecondMeta | null> {
    const trimmed = link.trim();
    if (!trimmed) return null;

    const origin = getPublicOrigin();
    const url = `${origin}/api/service-second/meta?link=${encodeURIComponent(trimmed)}`;

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: { Accept: "application/json" },
            next: { revalidate: 3600 },
        });

        if (res.status === 404) return null;
        if (!res.ok) {
            console.error("fetchMeta failed:", res.status, await res.text());
            return null;
        }

        const data = (await res.json()) as ServiceSecondMeta;
        return data;
    } catch (e) {
        console.error("fetchMeta error:", e);
        return null;
    }
}
