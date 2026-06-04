export type GalleryCategory =
  | "team"
  | "event"
  | "awards"
  | "creative"
  | "office";

export type GalleryImage = {
  src: string;
  category: GalleryCategory;
  label: string;
  title: string;
};

const GALLERY_TITLE_SUFFIX = " | Ritz Media World Memories Gallery";

export type GalleryImageInput = { src: string; label: string };

function buildGalleryImages(
  items: { src: string; category: GalleryCategory; label: string }[]
): GalleryImage[] {
  return items.map((item) => ({
    ...item,
    title: `${item.label}${GALLERY_TITLE_SUFFIX}`,
  }));
}

function withCategory(
  items: GalleryImageInput[],
  category: GalleryCategory
): { src: string; category: GalleryCategory; label: string }[] {
  return items.map((item) => ({ ...item, category }));
}

export const GALLERY_FILTER_OPTIONS: { id: "all" | GalleryCategory; label: string }[] =
  [
    { id: "all", label: "All" },
    { id: "team", label: "Team" },
    { id: "event", label: "Events" },
    { id: "awards", label: "Awards" },
    { id: "creative", label: "Creative" },
    { id: "office", label: "Office" },
  ];

/** H2 titles for the three featured columns (matches GALLERY_FEATURE_STRIP order). */
export const GALLERY_FEATURE_HEADINGS = [
  "Team Celebrations",
  "Behind the Scenes",
  "Awards & Recognition",
] as const;

/** Categories shown in the feature-card modal (index matches GALLERY_FEATURE_STRIP). */
export const GALLERY_FEATURE_MODAL_CATEGORIES: GalleryCategory[][] = [
  ["event", "team"],
  ["office", "creative", "team"],
  ["awards"],
];

/** All gallery images for a feature card modal (includes feature image + grid). */
export function getFeatureModalImages(featureIndex: number): GalleryImage[] {
  const categories = GALLERY_FEATURE_MODAL_CATEGORIES[featureIndex];
  if (!categories?.length) return [];

  const allowed = new Set(categories);
  return GALLERY_IMAGES.filter(
    (img) => img.src !== GALLERY_HERO.src && allowed.has(img.category)
  );
}

export const GALLERY_CTA = {
  heading: "Behind Every Award Is a Client Success Story.",
  body: "Join hundreds of brands that have trusted Ritz Media World to deliver impactful advertising and measurable results since 2008.",
  buttonLabel: "Let's Build Your Next Winning Campaign",
  href: "/contact.html",
  linkTitle:
    "Contact Ritz Media World — Let's Build Your Next Winning Campaign",
} as const;

export const GALLERY_FEATURE_STRIP = buildGalleryImages([
  {
    src: "/gallery/Team party.jpg",
    category: "event",
    label: "Team Celebrations",
  },
  {
    src: "/gallery/DSC01566.JPG",
    category: "team",
    label: "Behind the Scenes",
  },
  {
    src: "/gallery/Most Trusted Advertising Agency in NCR by The Economic Times.jpg",
    category: "awards",
    label: "Awards & Recognition",
  },
]);

export const GALLERY_HERO = buildGalleryImages([
  {
    src: "/gallery/photo_6120522001500805655_y.jpg",
    category: "team",
    label: "Team Moment",
  },
])[0];

export const GALLERY_HERO_IMAGE = GALLERY_HERO.src;

export type GalleryStat = {
  label: string;
  /** Animate from 0 when set */
  value?: number;
  suffix?: string;
  /** Static symbol (no count-up), e.g. ∞ */
  symbol?: string;
};

export const GALLERY_STATS: GalleryStat[] = [
  { value: 17, suffix: "+", label: "Years of Excellence" },
  { value: 90, suffix: "+", label: "Team Members" },
  { value: 200, suffix: "+", label: "Brands Served" },
  { symbol: "∞", label: "Memories Made" },
];

export const GALLERY_MARQUEE_ITEMS = [
  "Team Moments",
  "Creative Minds",
  "Event Highlights",
  "Award Winning",
  "Delhi NCR's Finest",
  "People-First Culture",
  "Behind The Scenes",
  "Celebrations",
] as const;

/** Team — group portraits, staff photos, people collaborating at work. */
const GALLERY_TEAM_INPUTS: GalleryImageInput[] = [
  { src: "/gallery/photo_6120522001500805655_y.jpg", label: "Team Moment" },
  { src: "/gallery/New Team Image (18-Nov-2025).jpg", label: "New Team Photo" },
  { src: "/gallery/team.jpg", label: "New Team" },
  { src: "/gallery/team 4.jpg", label: "Team Four" },
  { src: "/gallery/RMW.jpg", label: "RMW Family" },
  { src: "/gallery/Ritz media world R.jpg", label: "Team Formation" },
  { src: "/gallery/DSC03108.JPG", label: "The RMW Team" },
  { src: "/gallery/DSC01566.JPG", label: "Team at Work" },
  { src: "/gallery/IMG-20251211-WA0020.jpg", label: "Team Smiles" },
  { src: "/gallery/IMG-20250930-WA0091.jpg", label: "September" },
  { src: "/gallery/IMG-20250930-WA0102.jpg", label: "Team Spirit" },
  { src: "/gallery/IMG-20250930-WA0103.jpg", label: "Team Portrait" },
  { src: "/gallery/photo_2025-09-16_15-21-08.jpg", label: "September Vibes" },
  { src: "/gallery/photo_2025-06-24_12-32-10.jpg", label: "June Gathering" },
  { src: "/gallery/photo_2025-10-17_18-11-07.jpg", label: "Team Connect" },
  { src: "/gallery/photo_2025-10-17_18-11-11.jpg", label: "Team Huddle" },
  { src: "/gallery/photo_2025-11-11_10-40-36.jpg", label: "November" },
];

/** Events — parties, festivals, outings, award ceremonies, Star of the Month. */
const GALLERY_EVENT_INPUTS: GalleryImageInput[] = [
  { src: "/gallery/photo_2025-03-12_18-48-20.jpg", label: "Holi Celebration" },
  { src: "/gallery/photo_2025-03-12_18-48-19.jpg", label: "March Event" },
  { src: "/gallery/photo_2025-03-12_18-58-33.jpg", label: "March Moments" },
  { src: "/gallery/photo_2025-10-17_18-11-15.jpg", label: "Festive Team Day" },
  { src: "/gallery/photo_2025-10-17_18-15-59.jpg", label: "Office Festivities" },
  { src: "/gallery/photo_2025-11-28_22-19-28.jpg", label: "Celebration Night" },
  { src: "/gallery/Team party.jpg", label: "Team Party" },
  { src: "/gallery/Team 6.jpg", label: "Team Outing" },
  { src: "/gallery/IMG20250916125830.jpg", label: "Team Dinner" },
  { src: "/gallery/WhatsApp Image 2025-12-11 at 13.21.14_8262e416.jpg", label: "Celebration" },
  { src: "/gallery/WhatsApp Image 2025-12-11 at 13.17.51_db030edb.jpg", label: "Memories" },
  { src: "/gallery/WhatsApp Image 2025-12-11 at 13.18.12_625665af.jpg", label: "Festive Day" },
  { src: "/gallery/IMG-20251211-WA0034.jpg", label: "On Stage Award" },
  { src: "/gallery/IMG-20251211-WA0043.jpg", label: "Panel Discussion" },
  { src: "/gallery/IMG-20251211-WA0038.jpg", label: "Dream Makers Conclave" },
  { src: "/gallery/IMG-20251211-WA0010.jpg", label: "Office Party" },
  { src: "/gallery/IMG-20251211-WA0030.jpg", label: "Festive Cheer" },
  { src: "/gallery/IMG-20251211-WA0095.jpg", label: "Year End Bash" },
  { src: "/gallery/IMG-20251211-WA0016.jpg", label: "Party Mode" },
  { src: "/gallery/IMG-20251211-WA0052.jpg", label: "Fun Times" },
  { src: "/gallery/IMG-20251211-WA0040.jpg", label: "Celebration" },
  { src: "/gallery/IMG-20251211-WA0045.jpg", label: "Together Again" },
  { src: "/gallery/IMG-20251211-WA0026.jpg", label: "December" },
  { src: "/gallery/IMG-20251211-WA0004.jpg", label: "Office Fest" },
  { src: "/gallery/IMG-20251211-WA0018.jpg", label: "Holiday Cheer" },
  { src: "/gallery/IMG-20251211-WA0042.jpg", label: "Group Celebration" },
  { src: "/gallery/IMG-20251211-WA0032.jpg", label: "Office Joy" },
  { src: "/gallery/IMG-20251211-WA0041.jpg", label: "Year-End Party" },
  { src: "/gallery/IMG-20251211-WA0088.jpg", label: "Festive Gathering" },
  { src: "/gallery/Best Real Estate Podcast_Beyond The Blueprints Team.jpeg", label: "Podcast Team" },
  { src: "/gallery/photo_6186250402882325664_x.jpg", label: "Industry Event" },
  { src: "/gallery/photo_6186250402882325665_x.jpg", label: "ET Young Leaders" },
  { src: "/gallery/photo_6186250402882325716_y.jpg", label: "Birthday Cake" },
  { src: "/gallery/photo_6186250402882325717_y.jpg", label: "Birthday Celebration" },
  { src: "/gallery/photo_6120522001500805693_y.jpg", label: "Star of the Month" },
  { src: "/gallery/photo_6120522001500805694_y.jpg", label: "Star of the Month" },
  { src: "/gallery/photo_6120522001500805695_y.jpg", label: "Star of the Month" },
  { src: "/gallery/photo_6120522001500805696_y.jpg", label: "Star of the Month" },
  { src: "/gallery/photo_6120522001500805697_y.jpg", label: "Star of the Month" },
  { src: "/gallery/photo_6120522001500805698_y.jpg", label: "Star of the Month" },
  { src: "/gallery/photo_6120522001500805701_y.jpg", label: "Star of the Month" },
  { src: "/gallery/photo_6120522001500805702_y.jpg", label: "Star of the Month" },
  { src: "/gallery/photo_6120522001500805703_y.jpg", label: "Star of the Month" },
  { src: "/gallery/photo_6120522001500805705_y.jpg", label: "Star of the Month" },
  { src: "/gallery/photo_6120522001500805706_y.jpg", label: "Star of the Month" },
];

/** Awards — trophies, framed certificates, and industry recognition. */
const GALLERY_AWARDS_INPUTS: GalleryImageInput[] = [
  { src: "/gallery/Most Trusted Advertising Agency in NCR by The Economic Times.jpg", label: "Economic Times Award" },
  { src: "/gallery/Trusted Digital Advertising Agency in NCR-Awarded by The Economic Times.jpg", label: "ET Trusted Award" },
  { src: "/gallery/Special Achievement Award in Retail Category.jpg", label: "Retail Award" },
  { src: "/gallery/RMW 17 Years Complete.png", label: "17 Years Complete" },
  { src: "/gallery/IMG-20251211-WA0007.jpg", label: "Radio City Recognition" },
  { src: "/gallery/IMG-20251211-WA0011.jpg", label: "Hindustan Times Feature" },
  {
    src: "/gallery/Best Real Estate Podcast_Beyond The Blueprints.jpeg",
    label: "Podmasters Trophy",
  },
  { src: "/gallery/photo_2025-11-14_22-06-51.jpg", label: "Big Dream Makers Award" },
  { src: "/gallery/photo_2025-11-14_22-06-41.jpg", label: "Big Dream Makers Trophy" },
  { src: "/gallery/photo_2025-11-28_21-59-05.jpg", label: "ET Young Leaders Trophy" },
  { src: "/gallery/photo_2025-11-28_22-19-27.jpg", label: "ET Awards Ceremony" },
  { src: "/gallery/photo_2025-11-28_22-22-29.jpg", label: "ET Young Leaders" },
  { src: "/gallery/photo_2025-11-28_21-59-05 (3).jpg", label: "ET Young Leaders Display" },
  { src: "/gallery/photo_2025-11-15_00-42-59.jpg", label: "BIG Business Awards" },
  { src: "/gallery/photo_2025-11-15_00-43-00.jpg", label: "Awardee Moment" },
  { src: "/gallery/photo_2025-11-15_00-43-02.jpg", label: "My Property Fact Award" },
];

/** Creative — design, editing, campaigns, and creative team at work. */
const GALLERY_CREATIVE_INPUTS: GalleryImageInput[] = [
  { src: "/gallery/Creative Team2.JPG", label: "Creative Team" },
  { src: "/gallery/Creative team.JPG", label: "Creative Squad" },
  { src: "/gallery/Creative team Editing.JPG", label: "Editing Suite" },
  { src: "/gallery/Media 2.jpg", label: "Media Work" },
  { src: "/gallery/17e24618-1ebc-dd6c-1887-291bde275d77_1460_550.webp", label: "Campaign Work" },
  { src: "/gallery/photo_6186250402882325719_y.jpg", label: "Creative Crew" },
];

/** Office — workspaces, studios, and office interiors (no team events). */
const GALLERY_OFFICE_INPUTS: GalleryImageInput[] = [
  { src: "/gallery/RITz media world main.jpg", label: "Main Office" },
  { src: "/gallery/Ritz media world_.jpg", label: "The Space" },
  { src: "/gallery/Ritz.JPG", label: "Ritz HQ" },
  { src: "/gallery/Ritz1.JPG", label: "Ritz Studio" },
  { src: "/gallery/Ritz Media World Digital Office.jpg", label: "Digital Office" },
  { src: "/gallery/DSC03053.JPG", label: "Studio Shot" },
  { src: "/gallery/DSC03178.JPG", label: "Office Space" },
  { src: "/gallery/DSC00086.JPG", label: "The Office" },
  { src: "/gallery/rmw2.jpg", label: "RMW Studio" },
  { src: "/gallery/rmw3.jpg", label: "RMW Corner" },
  { src: "/gallery/photo_6120522001500805657_y.jpg", label: "Executive Suite" },
  { src: "/gallery/photo_6120522001500805658_y.jpg", label: "Conference Room" },
  { src: "/gallery/photo_6120522001500805659_y.jpg", label: "Open Workspace" },
  { src: "/gallery/photo_6120522001500805660_y.jpg", label: "Office Lounge" },
];

const GALLERY_IMAGE_GROUPS = [
  ...withCategory(GALLERY_TEAM_INPUTS, "team"),
  ...withCategory(GALLERY_EVENT_INPUTS, "event"),
  ...withCategory(GALLERY_AWARDS_INPUTS, "awards"),
  ...withCategory(GALLERY_CREATIVE_INPUTS, "creative"),
  ...withCategory(GALLERY_OFFICE_INPUTS, "office"),
];

export const GALLERY_IMAGES_BY_CATEGORY: Record<GalleryCategory, GalleryImage[]> = {
  team: buildGalleryImages(withCategory(GALLERY_TEAM_INPUTS, "team")),
  event: buildGalleryImages(withCategory(GALLERY_EVENT_INPUTS, "event")),
  awards: buildGalleryImages(withCategory(GALLERY_AWARDS_INPUTS, "awards")),
  creative: buildGalleryImages(withCategory(GALLERY_CREATIVE_INPUTS, "creative")),
  office: buildGalleryImages(withCategory(GALLERY_OFFICE_INPUTS, "office")),
};

export const GALLERY_IMAGES = buildGalleryImages(GALLERY_IMAGE_GROUPS);

export const GALLERY_FILTER_HEADINGS: Record<
  "all" | GalleryCategory,
  { primary: string; accent: string }
> = {
  all: { primary: "All", accent: "Memories" },
  team: { primary: "Team", accent: "Memories" },
  event: { primary: "Events", accent: "Memories" },
  awards: { primary: "Awards", accent: "Memories" },
  creative: { primary: "Creative", accent: "Memories" },
  office: { primary: "Office", accent: "Memories" },
};

const FEATURE_STRIP_SRCS = new Set(GALLERY_FEATURE_STRIP.map((item) => item.src));

/** Grid images only — excludes hero + feature strip so photos are not shown twice. */
export const GALLERY_GRID_IMAGES = GALLERY_IMAGES.filter(
  (img) => img.src !== GALLERY_HERO.src && !FEATURE_STRIP_SRCS.has(img.src)
);

export type GalleryFilterId = "all" | GalleryCategory;

/** Grid photo counts per filter tab (excludes hero + feature strip). */
export const GALLERY_GRID_COUNTS: Record<GalleryFilterId, number> = (() => {
  const byCategory = Object.fromEntries(
    (Object.keys(GALLERY_IMAGES_BY_CATEGORY) as GalleryCategory[]).map((key) => [
      key,
      GALLERY_IMAGES_BY_CATEGORY[key].filter(
        (img) => img.src !== GALLERY_HERO.src && !FEATURE_STRIP_SRCS.has(img.src)
      ).length,
    ])
  ) as Record<GalleryCategory, number>;
  return {
    all: GALLERY_GRID_IMAGES.length,
    ...byCategory,
  };
})();

/** Flat src list for legacy gallery components. */
export const GALLERY_IMAGE_SRCS = GALLERY_IMAGES.map((img) => img.src);
