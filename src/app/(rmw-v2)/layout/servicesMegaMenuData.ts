/**
 * Services mega menu: copy, routes, and optional thumbnails (public paths).
 * Routes align with `src/app/(rmw-v2)` and middleware-friendly `/services/*` paths.
 */

export type MegaMenuServiceLink = {
  title: string;
  description: string;
  href: string;
  /** Optional square image under /public */
  image?: string;
};

export type MegaMenuCategory = {
  id: string;
  name: string;
  href: string;
  services: MegaMenuServiceLink[];
};

export const SERVICES_MEGA_TAGLINE =
  "Complete Branding & Marketing Solutions Under One Roof!";

export const SERVICES_MEGA_MENU_CATEGORIES: MegaMenuCategory[] = [
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    href: "/services/digital-marketing",
    services: [
      {
        title: "SEO (Search Engine Optimization)",
        description: "Boost organic visibility and traffic.",
        href: "/services/digital-marketing/search-engine-optimization-seo",
        image: "/navbar/seo.png",
      },
      {
        title: "ORM (Online Reputation Management)",
        description: "Protect and enhance brand reputation.",
        href: "/services/digital-marketing/orm-in-digital-marketing",
        image: "/navbar/orm.png",
      },
      {
        title: "PPC (Google Ads) Services",
        description: "Targeted campaigns with measurable results.",
        href: "/services/digital-marketing/ppc-google-ads-agency",
        image: "/navbar/ppc.png",
      },
      {
        title: "Lead Generation",
        description: "Attract, nurture, and convert leads.",
        href: "/services/digital-marketing/lead-generation",
        image: "/navbar/leadgeneration.png",
      },
      {
        title: "Social Media Management",
        description: "Boost online visibility and engagement.",
        href: "/services/digital-marketing/social-media-management",
        image: "/navbar/social-media.png",
      },
      {
        title: "Brand Awareness",
        description: "Elevate recognition and customer loyalty.",
        href: "/services/digital-marketing/brand-awareness",
        image: "/navbar/brand-awareness.png",
      },
    ],
  },
  {
    id: "creative-services",
    name: "Creative Services",
    href: "/services/creative-services",
    services: [
      {
        title: "Branding & Identity Development",
        description: "Define a memorable brand system and voice.",
        href: "/services/creative-services/branding-and-identity-development",
        image: "/navbar/seo.png",
      },
      {
        title: "Graphic Design",
        description: "Campaign-ready visuals across touchpoints.",
        href: "/services/creative-services/graphic-designing",
        image: "/navbar/orm.png",
      },
      {
        title: "Logo Design",
        description: "Distinct marks built for scale and recall.",
        href: "/services/creative-services/logo-design",
        image: "/navbar/ppc.png",
      },
      {
        title: "Print Advertising Design",
        description: "Layouts optimized for impact in print.",
        href: "/services/creative-services/print-advertisement-design",
        image: "/navbar/leadgeneration.png",
      },
      {
        title: "Packaging Design",
        description: "Shelf-ready packaging that tells your story.",
        href: "/services/creative-services/packaging-design",
        image: "/navbar/social-media.png",
      },
    ],
  },
  {
    id: "print-advertising",
    name: "Print Advertising",
    href: "/services/print-advertising2",
    services: [
      {
        title: "Advertisement Design",
        description: "High-impact creative for newspaper and magazine.",
        href: "/services/print-advertising2/advertisement-designing",
        image: "/navbar/seo.png",

      },
      {
        title: "Ad Placement",
        description: "Strategic placement across premium publications.",
        href: "/services/print-advertising2/ad-placements",
        image: "/navbar/orm.png",
      },
      {
        title: "Copywriting",
        description: "Sharp copy that moves readers to act.",
        href: "/services/print-advertising2/copywriting",
        image: "/navbar/ppc.png",
      },
      {
        title: "Cost Negotiation",
        description: "Better rates through experienced media buying.",
        href: "/services/print-advertising2/negotiating-rates",
        image: "/navbar/leadgeneration.png",
      },
      {
        title: "Ad Size Optimization",
        description: "Formats tuned for visibility and budget.",
        href: "/services/print-advertising2/ad-size-optimization",
        image: "/navbar/social-media.png",
      },
      {
        title: "Ad Scheduling",
        description: "Timing that aligns with audience and news cycles.",
        href: "/services/print-advertising2/advertisement-scheduling",
        image: "/navbar/brand-awareness.png",
      },
    ],
  },
  {
    id: "radio-advertising",
    name: "Radio Advertising",
    href: "/services/radio-advertising",
    services: [
      {
        title: "Advertising Concept Development",
        description: "Ideas built for ear and memorability.",
        href: "/services/radio-advertising/advertisement-concept-development",
       image: "/navbar/orm.png",
      },
      {
        title: "Scriptwriting",
        description: "Tight scripts for clarity and punch.",
        href: "/services/radio-advertising/scriptwriting",
        image: "/navbar/ppc.png",
      },
      {
        title: "Voiceover Casting",
        description: "The right voice for your brand tone.",
        href: "/services/radio-advertising/voiceover-casting",
        image: "/navbar/leadgeneration.png",
      },
      {
        title: "Recording & Production",
        description: "Broadcast-quality audio end to end.",
        href: "/services/radio-advertising/recording-and-production",
        image: "/navbar/social-media.png",
      },
      {
        title: "Media Planning And Buying",
        description: "Stations, spots, and schedules that deliver reach.",
        href: "/services/radio-advertising/media-planning-and-buying",
        image: "/navbar/brand-awareness.png",
      },
      {
        title: "Cost Negotiations",
        description: "Efficient spends across networks and markets.",
        href: "/services/radio-advertising/radio-cost-negotiation-india",
        image: "/navbar/seo.png",
      },
    ],
  },
  {
    id: "content-marketing",
    name: "Content Marketing",
    href: "/services/contents-marketing",
    services: [
      {
        title: "Customized Content Strategy",
        description: "Editorial plans mapped to funnel goals.",
        href: "/services/contents-marketing/content-marketing",
        image: "/navbar/orm.png",
      },
      {
        title: "Email and Newsletters Marketing",
        description: "Lifecycle messaging that nurtures subscribers.",
        href: "/services/contents-marketing/email-and-newsletters-marketing",
        image: "/navbar/ppc.png",
      },
      {
        title: "Asset Creation and Infographics",
        description: "Shareable assets that simplify complex ideas.",
        href: "/services/contents-marketing/asset-creation-and-infographics",
        image: "/navbar/leadgeneration.png",
      },
      {
        title: "Content Promotion and Optimization",
        description: "Distribution and tuning for sustained performance.",
        href: "/services/contents-marketing/content-promotion-and-optimization",
        image: "/navbar/social-media.png",
      },
    ],
  },
  {
    id: "web-development",
    name: "Web Development",
    href: "/web-development",
    services: [
      {
        title: "UI/UX Design",
        description: "Interfaces focused on clarity and conversion.",
        href: "/web-development",
        image: "/navbar/seo.png",
      },
      {
        title: "Custom Design & Development",
        description: "Tailored builds for speed and scalability.",
        href: "/web-development",
        image: "/navbar/orm.png",
      },
      {
        title: "E-Commerce Website Development",
        description: "Stores engineered for trust and checkout.",
        href: "/web-development",
        image: "/navbar/ppc.png",
      },
      {
        title: "Landing Page Development",
        description: "Focused pages for campaigns and lead capture.",
        href: "/web-development",
        image: "/navbar/leadgeneration.png",
      },
      {
        title: "WordPress Web Design",
        description: "Flexible CMS sites with clean, maintainable code.",
        href: "/web-development",
        image: "/navbar/brand-awareness.png",
      },
    ],
  },
  {
    id: "celebrity-endorsements",
    name: "Celebrity Endorsements",
    href: "/services/celebrity-endorsements2",
    services: [
      {
        title: "Celebrity Identification",
        description: "Shortlist talent aligned with brand and audience.",
        href: "/services/celebrity-endorsements2/celebrity-identification-services",
        image: "/navbar/seo.png",
      },
      {
        title: "Contract Negotiations",
        description: "Structured deals with clear deliverables.",
        href: "/services/celebrity-endorsements2/negotiating-contracts",
        image: "/navbar/orm.png",
      },
      {
        title: "Creative Collaboration",
        description: "Campaigns that feel authentic to both sides.",
        href: "/services/celebrity-endorsements2/creative-collaboration",
        image: "/navbar/ppc.png",
      },
      {
        title: "Campaign Integration",
        description: "Unified rollout across channels and assets.",
        href: "/services/celebrity-endorsements2/campaign-integration",
        image: "/navbar/leadgeneration.png",
      },
      {
        title: "Public Relations",
        description: "Narrative and visibility around partnerships.",
        href: "/services/celebrity-endorsements2/public-relations",
        image: "/navbar/social-media.png",
      },
      {
        title: "Legal Compliance",
        description: "Guardrails for claims, usage, and disclosures.",
        href: "/services/celebrity-endorsements2/legal-compliance",
        image: "/navbar/brand-awareness.png",
      },
    ],
  },
  {
    id: "influencer-marketing",
    name: "Influencer Marketing",
    href: "/services/influencer-marketing-agency-in-india",
    services: [
      {
        title: "Influencer Identification",
        description: "Vetted creators matched to KPIs and audience.",
        href: "/services/influencer-marketing-agency-in-india/identification-influence-marketing-agency",
        image: "/navbar/seo.png",
      },
      {
        title: "Cost-Benefit Analysis",
        description: "Transparent modeling before you commit.",
        href: "/services/influencer-marketing-agency-in-india/cost-benefit-analysis",
        image: "/navbar/orm.png",
      },
      {
        title: "Terms Negotiations",
        description: "Scopes, timelines, and usage that protect you.",
        href: "/services/influencer-marketing-agency-in-india/terms-negotiations",
        image: "/navbar/ppc.png",
      },
      {
        title: "Creative Collaboration",
        description: "Briefs that inspire on-brand creator content.",
        href: "/services/influencer-marketing-agency-in-india/creative-collaboration",
        image: "/navbar/leadgeneration.png",
      },
      {
        title: "Campaign Integration",
        description: "Amplify creator work across paid and owned.",
        href: "/services/influencer-marketing-agency-in-india/campaign-integration",
        image: "/navbar/social-media.png",
      },
      {
        title: "Messaging Optimization",
        description: "Iterate creative for stronger engagement.",
        href: "/services/influencer-marketing-agency-in-india/messaging-optimization",
        image: "/navbar/brand-awareness.png",
      },
    ],
  },
  {
    id: "real-estate-walkthrough",
    name: "Real Estate Walkthrough",
    href: "/web-development",
    services: [
      {
        title: "3D & Virtual Property Experiences",
        description: "Immersive tours that shorten the decision path.",
        href: "/web-development",
        image: "/navbar/seo.png",
      },
      {
        title: "Project & Microsite Development",
        description: "Dedicated sites for launches and inventory.",
        href: "/web-development",
        image: "/navbar/orm.png",
      },
      {
        title: "Visual Storytelling for Listings",
        description: "Premium presentation for high-ticket inventory.",
        href: "/web-development",
        image: "/navbar/leadgeneration.png",
      },
      {
        title: "Performance & Lead Capture",
        description: "Fast pages with forms tuned for qualified leads.",
        href: "/web-development",
        image: "/navbar/brand-awareness.png",
      },
    ],
  },
  {
    id: "3D-rendering-services",
    name: "3D Rendering Services",
    href: "/services/3D-rendering-services",
    services: [
      {
        title: "SEO (Search Engine Optimization)",
        description: "Boost organic visibility and traffic.",
        href: "/services/digital-marketing/search-engine-optimization-seo",
        image: "/navbar/seo.png",
      },
      {
        title: "ORM (Online Reputation Management)",
        description: "Protect and enhance brand reputation.",
        href: "/services/digital-marketing/orm-in-digital-marketing",
        image: "/navbar/orm.png",
      },
      {
        title: "PPC (Google Ads) Services",
        description: "Targeted campaigns with measurable results.",
        href: "/services/digital-marketing/ppc-google-ads-agency",
        image: "/navbar/ppc.png",

      },
      {
        title: "Lead Generation",
        description: "Attract, nurture, and convert leads.",
        href: "/services/digital-marketing/lead-generation",
        image: "/navbar/leadgeneration.png",
      },
      {
        title: "Social Media Management",
        description: "Boost online visibility and engagement.",
        href: "/services/digital-marketing/social-media-management",
        image: "/navbar/social-media.png",
      },
      {
        title: "Brand Awareness",
        description: "Elevate recognition and customer loyalty.",
        href: "/services/digital-marketing/brand-awareness",
        image: "/navbar/brand-awareness.png",
      },
    ],
  }
];
