export const RENDERING_SERVICES_BASE_PATH = "/services/3d-rendering-services";
export const RENDERING_SERVICES_SECTION_ID = "our-3d-rendering-services";

export const RENDERING_SERVICE_TAB_SLUGS = [
    "3d-exterior-rendering",
    "3d-interior-rendering",
    "aerial-township",
    "3d-floor-plan-rendering",
    "amenity-landscape-rendering",
] as const;

export type RenderingServiceTabSlug = (typeof RENDERING_SERVICE_TAB_SLUGS)[number];

export function isRenderingServiceTabSlug(slug: string): slug is RenderingServiceTabSlug {
    return (RENDERING_SERVICE_TAB_SLUGS as readonly string[]).includes(slug);
}

export function renderingServiceHref(slug: RenderingServiceTabSlug): string {
    return `${RENDERING_SERVICES_BASE_PATH}/${slug}`;
}

export function getRenderingServiceTabSlugFromPathname(pathname: string): RenderingServiceTabSlug | null {
    const prefix = `${RENDERING_SERVICES_BASE_PATH}/`;
    if (!pathname.startsWith(prefix)) return null;

    const slug = pathname.slice(prefix.length).split("/")[0]?.toLowerCase();
    if (!slug || !isRenderingServiceTabSlug(slug)) return null;

    return slug;
}

export function getRenderingServiceTabIndexFromPathname(pathname: string): number | null {
    const slug = getRenderingServiceTabSlugFromPathname(pathname);
    if (!slug) return null;

    return RENDERING_SERVICE_TAB_SLUGS.indexOf(slug);
}

/** @deprecated Legacy hash URLs — use pathname helpers instead. */
export function getRenderingServiceTabIndex(hash: string): number | null {
    const slug = hash.replace(/^#/, "").toLowerCase();
    const index = RENDERING_SERVICE_TAB_SLUGS.indexOf(slug as RenderingServiceTabSlug);
    return index >= 0 ? index : null;
}

export function getRenderingServiceTabSlug(index: number): RenderingServiceTabSlug | null {
    return RENDERING_SERVICE_TAB_SLUGS[index] ?? null;
}

export function isRenderingServiceDeepLink(pathname: string): boolean {
    return getRenderingServiceTabIndexFromPathname(pathname) !== null;
}

/** Fixed navbar clearance when scrolling to the services block. */
export const RENDERING_SERVICES_SCROLL_OFFSET = 100;

export function scrollToRenderingServicesSection(
    sectionEl: HTMLElement | null,
    behavior: ScrollBehavior = "smooth"
) {
    if (!sectionEl || typeof window === "undefined") return;

    const top =
        sectionEl.getBoundingClientRect().top +
        window.scrollY -
        RENDERING_SERVICES_SCROLL_OFFSET;

    window.scrollTo({
        top: Math.max(0, top),
        behavior,
    });
}
