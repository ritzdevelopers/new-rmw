import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ritz Media World Memories Gallery | Team Moments & Event Highlights",
  description:
    "Browse the Ritz Media World Memories Gallery featuring team celebrations, office events, behind-the-scenes moments, achievements, and unforgettable experiences that reflect our culture and people-first approach.",
  keywords:
    "Ritz Media World memories, team gallery, office events photos, company culture images, RMW team moments, corporate celebrations, employee activities, behind the scenes Ritz Media World, event highlights gallery, Digital marketing agency, Creative agency, Social media marketing",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

