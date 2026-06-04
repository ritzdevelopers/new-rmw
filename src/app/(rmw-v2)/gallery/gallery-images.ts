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

function buildGalleryImages(
  items: { src: string; category: GalleryCategory; label: string }[]
): GalleryImage[] {
  return items.map((item) => ({
    ...item,
    title: `${item.label}${GALLERY_TITLE_SUFFIX}`,
  }));
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

export const GALLERY_FEATURE_STRIP = buildGalleryImages([
  {
    src: "/gallery/Team party.jpg",
    category: "event",
    label: "Team Celebrations",
  },
  {
    src: "/gallery/DSC01566.JPG",
    category: "office",
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

export const GALLERY_STATS = [
  { number: "12+", label: "Years of Excellence" },
  { number: "200+", label: "Team Members" },
  { number: "500+", label: "Brands Served" },
  { number: "∞", label: "Memories Made" },
] as const;

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

/** Primary gallery grid — categories from rmw-gallery.html, extended with local assets. */
export const GALLERY_IMAGES = buildGalleryImages([
  { src: "/gallery/DSC01566.JPG", category: "office", label: "Office Vibes" },
  { src: "/gallery/Creative Team2.JPG", category: "creative", label: "Creative Team" },
  { src: "/gallery/photo_2025-03-12_18-48-20.jpg", category: "event", label: "Event Highlights" },
  { src: "/gallery/Ritz media world R.jpg", category: "office", label: "RMW HQ" },
  { src: "/gallery/IMG-20251211-WA0007.jpg", category: "team", label: "The Team" },
  {
    src: "/gallery/Best Real Estate Podcast_Beyond The Blueprints.jpeg",
    category: "event",
    label: "Podcast Event",
  },
  { src: "/gallery/Team party.jpg", category: "event", label: "Team Party" },
  { src: "/gallery/IMG20250916125830.jpg", category: "team", label: "Team Outing" },
  { src: "/gallery/Creative team Editing.JPG", category: "creative", label: "Editing Suite" },
  {
    src: "/gallery/WhatsApp Image 2025-12-11 at 13.21.14_8262e416.jpg",
    category: "event",
    label: "Celebration",
  },
  { src: "/gallery/Team 6.jpg", category: "team", label: "Team 2025" },
  { src: "/gallery/IMG-20251211-WA0043.jpg", category: "event", label: "Event Day" },
  { src: "/gallery/RITz media world main.jpg", category: "office", label: "Main Office" },
  { src: "/gallery/photo_2025-10-17_18-11-15.jpg", category: "team", label: "Team Gather" },
  { src: "/gallery/IMG-20251211-WA0038.jpg", category: "event", label: "December Fest" },
  { src: "/gallery/IMG-20251211-WA0020.jpg", category: "team", label: "Team Smiles" },
  { src: "/gallery/IMG-20251211-WA0010.jpg", category: "event", label: "Office Party" },
  { src: "/gallery/photo_2025-11-28_21-59-05.jpg", category: "team", label: "Together" },
  { src: "/gallery/IMG-20251211-WA0030.jpg", category: "event", label: "Festive Cheer" },
  { src: "/gallery/DSC03053.JPG", category: "office", label: "Studio Shot" },
  { src: "/gallery/team.jpg", category: "team", label: "New Team" },
  { src: "/gallery/Ritz.JPG", category: "office", label: "Ritz HQ" },
  { src: "/gallery/photo_2025-09-16_15-21-08.jpg", category: "team", label: "September Vibes" },
  { src: "/gallery/Creative team.JPG", category: "creative", label: "Creative Squad" },
  {
    src: "/gallery/Most Trusted Advertising Agency in NCR by The Economic Times.jpg",
    category: "awards",
    label: "Economic Times Award",
  },
  { src: "/gallery/Ritz media world_.jpg", category: "office", label: "The Space" },
  { src: "/gallery/Media 2.jpg", category: "creative", label: "Media Work" },
  { src: "/gallery/IMG-20251211-WA0095.jpg", category: "event", label: "Year End Bash" },
  { src: "/gallery/IMG-20251211-WA0016.jpg", category: "event", label: "Party Mode" },
  { src: "/gallery/photo_2025-11-14_22-06-51.jpg", category: "team", label: "November Moments" },
  {
    src: "/gallery/WhatsApp Image 2025-12-11 at 13.17.51_db030edb.jpg",
    category: "event",
    label: "Memories",
  },
  { src: "/gallery/IMG-20251211-WA0052.jpg", category: "event", label: "Fun Times" },
  { src: "/gallery/DSC03178.JPG", category: "office", label: "Office Space" },
  { src: "/gallery/IMG-20251211-WA0034.jpg", category: "event", label: "Group Photo" },
  { src: "/gallery/IMG-20250930-WA0091.jpg", category: "team", label: "September" },
  { src: "/gallery/photo_2025-03-12_18-48-19.jpg", category: "event", label: "March Event" },
  { src: "/gallery/photo_2025-11-11_10-40-36.jpg", category: "team", label: "November" },
  { src: "/gallery/IMG-20251211-WA0040.jpg", category: "event", label: "Celebration" },
  { src: "/gallery/photo_2025-06-24_12-32-10.jpg", category: "team", label: "June Gathering" },
  {
    src: "/gallery/Trusted Digital Advertising Agency in NCR-Awarded by The Economic Times.jpg",
    category: "awards",
    label: "ET Trusted Award",
  },
  { src: "/gallery/RMW.jpg", category: "office", label: "RMW Family" },
  { src: "/gallery/IMG-20251211-WA0045.jpg", category: "event", label: "Together Again" },
  { src: "/gallery/DSC00086.JPG", category: "office", label: "The Office" },
  { src: "/gallery/DSC03108.JPG", category: "creative", label: "Creative Work" },
  { src: "/gallery/photo_2025-11-15_00-42-59.jpg", category: "team", label: "Night Out" },
  { src: "/gallery/photo_2025-11-14_22-06-41.jpg", category: "team", label: "Evening Together" },
  { src: "/gallery/IMG-20251211-WA0026.jpg", category: "event", label: "December" },
  { src: "/gallery/IMG-20251211-WA0011.jpg", category: "event", label: "Team Vibes" },
  { src: "/gallery/rmw3.jpg", category: "office", label: "RMW Corner" },
  { src: "/gallery/IMG-20250930-WA0103.jpg", category: "team", label: "Team Portrait" },
  { src: "/gallery/photo_2025-11-28_22-19-27.jpg", category: "team", label: "Team Bonding" },
  { src: "/gallery/RMW 17 Years Complete.png", category: "awards", label: "17 Years Complete" },
  { src: "/gallery/photo_2025-11-28_22-19-28.jpg", category: "event", label: "Celebration Night" },
  { src: "/gallery/Ritz Media World Digital Office.jpg", category: "office", label: "Digital Office" },
  { src: "/gallery/New Team Image (18-Nov-2025).jpg", category: "team", label: "New Team Photo" },
  { src: "/gallery/IMG-20251211-WA0004.jpg", category: "event", label: "Office Fest" },
  {
    src: "/gallery/WhatsApp Image 2025-12-11 at 13.18.12_625665af.jpg",
    category: "event",
    label: "Festive Day",
  },
  { src: "/gallery/photo_2025-10-17_18-11-07.jpg", category: "team", label: "Team Connect" },
  { src: "/gallery/photo_2025-11-15_00-43-02.jpg", category: "team", label: "After Hours" },
  { src: "/gallery/IMG-20251211-WA0018.jpg", category: "event", label: "Holiday Cheer" },
  { src: "/gallery/IMG-20250930-WA0102.jpg", category: "team", label: "Team Spirit" },
  { src: "/gallery/photo_2025-03-12_18-58-33.jpg", category: "event", label: "March Moments" },
  { src: "/gallery/Ritz1.JPG", category: "office", label: "Ritz Studio" },
  { src: "/gallery/IMG-20251211-WA0042.jpg", category: "event", label: "Group Celebration" },
  { src: "/gallery/photo_2025-10-17_18-11-11.jpg", category: "team", label: "Team Huddle" },
  { src: "/gallery/IMG-20251211-WA0032.jpg", category: "event", label: "Office Joy" },
  { src: "/gallery/rmw2.jpg", category: "office", label: "RMW Studio" },
  { src: "/gallery/photo_2025-11-28_21-59-05 (3).jpg", category: "team", label: "Team Together" },
  { src: "/gallery/IMG-20251211-WA0041.jpg", category: "event", label: "Year-End Party" },
  { src: "/gallery/photo_2025-10-17_18-15-59.jpg", category: "team", label: "Creative Huddle" },
  { src: "/gallery/17e24618-1ebc-dd6c-1887-291bde275d77_1460_550.webp", category: "creative", label: "Campaign Work" },
  { src: "/gallery/photo_2025-11-15_00-43-00.jpg", category: "team", label: "Team Night" },
  { src: "/gallery/team 4.jpg", category: "team", label: "Team Four" },
  { src: "/gallery/IMG-20251211-WA0088.jpg", category: "event", label: "Festive Gathering" },
  { src: "/gallery/Special Achievement Award in Retail Category.jpg", category: "awards", label: "Retail Award" },
  {
    src: "/gallery/Best Real Estate Podcast_Beyond The Blueprints Team.jpeg",
    category: "event",
    label: "Podcast Team",
  },
  { src: "/gallery/photo_6186250402882325664_x.jpg", category: "team", label: "Team Snapshot" },
  { src: "/gallery/photo_6186250402882325665_x.jpg", category: "team", label: "Office Friends" },
  { src: "/gallery/photo_6186250402882325716_y.jpg", category: "event", label: "Event Snap" },
  { src: "/gallery/photo_6186250402882325717_y.jpg", category: "event", label: "Celebration Time" },
  { src: "/gallery/photo_6186250402882325719_y.jpg", category: "team", label: "Team Frame" },
  { src: "/gallery/photo_6120522001500805655_y.jpg", category: "team", label: "Team Moment" },
  { src: "/gallery/photo_6120522001500805657_y.jpg", category: "team", label: "Office Life" },
  { src: "/gallery/photo_6120522001500805658_y.jpg", category: "event", label: "Event Frame" },
  { src: "/gallery/photo_6120522001500805659_y.jpg", category: "team", label: "Smiles All Around" },
  { src: "/gallery/photo_6120522001500805660_y.jpg", category: "event", label: "Gathering" },
  { src: "/gallery/photo_6120522001500805693_y.jpg", category: "team", label: "Team Energy" },
  { src: "/gallery/photo_6120522001500805694_y.jpg", category: "creative", label: "Creative Moment" },
  { src: "/gallery/photo_6120522001500805695_y.jpg", category: "team", label: "Work Family" },
  { src: "/gallery/photo_6120522001500805696_y.jpg", category: "event", label: "Office Event" },
  { src: "/gallery/photo_6120522001500805697_y.jpg", category: "team", label: "Together We Grow" },
  { src: "/gallery/photo_6120522001500805698_y.jpg", category: "event", label: "Special Day" },
  { src: "/gallery/photo_6120522001500805701_y.jpg", category: "team", label: "Team Culture" },
  { src: "/gallery/photo_6120522001500805702_y.jpg", category: "creative", label: "In the Studio" },
  { src: "/gallery/photo_6120522001500805703_y.jpg", category: "event", label: "Festive Frame" },
  { src: "/gallery/photo_6120522001500805705_y.jpg", category: "team", label: "People First" },
  { src: "/gallery/photo_6120522001500805706_y.jpg", category: "event", label: "Memories Made" },
]);

/** Flat src list for legacy gallery components. */
export const GALLERY_IMAGE_SRCS = GALLERY_IMAGES.map((img) => img.src);
