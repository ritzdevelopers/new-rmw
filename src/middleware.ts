import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  const url = req.nextUrl; 

  // Canonicalize /web-stories from www -> non-www
  if (pathname === "/web-stories" && url.hostname === "www.ritzmediaworld.com") {
    const redirectUrl = url.clone();
    redirectUrl.hostname = "ritzmediaworld.com";
    return NextResponse.redirect(redirectUrl, 301);
  }

  // Ignore Next.js internal paths
  if (url.pathname.startsWith("/_next") || url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const splitLink = url.pathname.split("/");
  const year = splitLink[1];
  const day = splitLink[2];
  const month = splitLink[3];
  if (year && day && month && splitLink[4]) {
    const dateStr = `${year}/${month}/${day}`;
    const dateObj = new Date(dateStr);
    if (!isNaN(dateObj.getTime())) {
      return NextResponse.redirect(
        new URL(`/${splitLink[4]}`, req.url),
        301
      );
    }
  }

  // List Of Solo Links Navigation 
  if (url.pathname.startsWith("/campaign-integration.html")) {
    return NextResponse.redirect(
      new URL("/services/influencer-marketing-agency-in-india/campaign-integration", req.url),
      301
    );
  }

  if (url.pathname.startsWith("/radio-advertising.html")) {
    return NextResponse.redirect(
      new URL("/services/radio-advertising", req.url),
      301
    );
  }

  if (url.pathname.startsWith("/creative-services.html")) {
    return NextResponse.redirect(
      new URL("/services/creative-services", req.url),
      301
    );
  }

  if (url.pathname.startsWith("/celebrity-selection.html")) {
    return NextResponse.redirect(
      new URL("/services/celebrity-endorsements", req.url),
      301
    );
  }

  if (url.pathname.startsWith("/graphic-designing.html")) {
    return NextResponse.redirect(
      new URL("/services/creative-services/graphic-designing", req.url),
      301
    );
  }

  if (url.pathname.startsWith("/about")) {
    return NextResponse.redirect(
      new URL("/about.html", req.url),
      301
    );
  }

  if (url.pathname.startsWith("/contact")) {
    return NextResponse.redirect(
      new URL("/contact.html", req.url),
      301
    )
  }

  if (url.pathname.startsWith("/web-designing-development.html")) {
    return NextResponse.redirect(
      new URL("/services/web-designing-and-development", req.url),
      301
    );
  }

  if (url.pathname.startsWith("/real-estate-companies-dubai")) {
    return NextResponse.redirect(
      new URL("/top-real-estate-companies-dubai-property-investment", req.url),
      301
    );
  }

  if (url.pathname.startsWith("/contents-marketing.html")) {
    return NextResponse.redirect(
      new URL("/services/contents-marketing", req.url),
      301
    );
  }

  if (url.pathname.startsWith("/realestate-industry.html")) {
    return NextResponse.redirect(
      new URL("/digital-marketing-strategies-for-real-estate-businesses", req.url),
      301
    );
  }

  if (url.pathname.startsWith("/orm-in-digital-marketing.html")) {
    return NextResponse.redirect(
      new URL("/services/digital-marketing/orm-in-digital-marketing", req.url),
      301
    );
  }

  if (url.pathname.startsWith("/advertisement-designing.html")) {
    return NextResponse.redirect(
      new URL("/services/print-advertising/advertisement-designing", req.url),
      301
    );
  }

  if (url.pathname.startsWith("/what-is-fm-radio-advertising-agency")) {
    return NextResponse.redirect(
      new URL("/fm-radio-advertising-benefits-costs-strategies", req.url),
      301
    );
  }

  if (url.pathname.startsWith("/about-2")) {
    return NextResponse.redirect(
      new URL("/about.html", req.url),
      301
    );
  }

  if (url.pathname.startsWith("/custom-design-development.html")) {
    return NextResponse.redirect(
      new URL("/services/web-designing-and-development/custom-design-development", req.url),
      301
    );
  }

  if (url.pathname.startsWith("/influencer-marketing-agency-in-india")) {
    return NextResponse.redirect(
      new URL("/services/influencer-marketing-agency-in-india", req.url),
      301
    )
  }

  if (url.pathname.startsWith("/celebrity-endorsements")) {
    return NextResponse.redirect(
      new URL("/services/celebrity-endorsements", req.url),
      301
    )
  }

  if (url.pathname.startsWith("/web-designing-and-development")) {
    return NextResponse.redirect(
      new URL("/services/web-designing-and-development", req.url),
      301
    )
  }

  if (url.pathname.startsWith("/contents-marketing")) {
    return NextResponse.redirect(
      new URL("/services/contents-marketing", req.url),
      301
    )
  }

  if (url.pathname.startsWith("/digital-marketing")) {
    return NextResponse.redirect(
      new URL("/services/digital-marketing", req.url),
      301
    )
  }

  if (url.pathname.startsWith("/print-advertising")) {
    return NextResponse.redirect(
      new URL("/services/print-advertising", req.url),
      301
    )
  }

  if (url.pathname.startsWith("/creative-services")) {
    return NextResponse.redirect(
      new URL("/services/creative-services", req.url),
      301
    )
  }

  if (url.pathname.startsWith("/radio-advertising")) {
    return NextResponse.redirect(
      new URL("/services/radio-advertising", req.url),
      301
    )
  }




  // **************************************************************************

  if (
    url.pathname.startsWith("/iizuka.city.official") ||
    url.pathname.startsWith("/refund-policy.html") ||
    url.pathname.startsWith("/fr") ||
    url.pathname.startsWith("/water-well-screen") ||
    url.pathname.startsWith("/propateer")
  ) {
    return NextResponse.redirect(new URL("/", url.origin), 301);
  }
  if (
    url.pathname.startsWith(
      "/best-locations-for-outdoor-advertising-in-new-delhi-"
    )
  ) {
    return NextResponse.redirect(
      new URL(
        "/best-locations-for-outdoor-advertising-in-new-delhi",
        req.url
      ),
      301
    );
  }

  if (url.pathname.startsWith("/blog")) {
    const changeURL = url.pathname.replace("/blog/", "");
    const newURL = new URL(`/${changeURL}`, url.origin);
    return NextResponse.redirect(newURL, 301);
  }

  // ✅ Redirect /admin to /admin/dashboard
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // ✅ If authenticated user visits `/admin/sign-in`, redirect them to `/admin`
  if (pathname === "/admin/sign-in" && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // ✅ Allow access to `/admin/sign-in` if not authenticated
  if (pathname === "/admin/sign-in") {
    return NextResponse.next();
  }

  // ✅ Protect all "/admin" routes (except "/admin/sign-in") if no token
  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/admin/sign-in", req.url));
  }

  return NextResponse.next();
}

// ✅ Apply middleware to matching routes (including date-style URLs: /year/day/month/slug)
export const config = {
  matcher: [
    // Date-style redirect: /2024/15/01/blog-slug -> /blog-slug
    "/:year/:day/:month/:slug*",
    // ✅ Previous matchers (keep as they are)
    "/admin/:path*",
    "/blog/:path*",
    "/fr/:path*",
    "/refund-policy.html",
    "/iizuka.city.official/:path*",
    "/water-well-screen/:path*",
    "/propateer/:path*",
    "/best-locations-for-outdoor-advertising-in-new-delhi-:path*",

    // ✅ New Solo Links matchers
    "/campaign-integration.html",
    "/radio-advertising.html",
    "/creative-services.html",
    "/celebrity-selection.html",
    "/graphic-designing.html",
    "/web-designing-development.html",
    "/real-estate-companies-dubai",
    "/contents-marketing.html",
    "/realestate-industry.html",
    "/orm-in-digital-marketing.html",
    "/advertisement-designing.html",
    "/what-is-fm-radio-advertising-agency",
    "/about-2",
    "/custom-design-development.html",

    // ✅ Top-level and service route redirects
    "/about",
    "/contact",
    "/web-stories",
    "/influencer-marketing-agency-in-india",
    "/celebrity-endorsements",
    "/web-designing-and-development",
    "/contents-marketing",
    "/digital-marketing",
    "/print-advertising",
    "/creative-services",
    "/radio-advertising",
  ],
};
