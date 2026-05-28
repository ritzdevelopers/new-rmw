import { aboutPageMetadata } from "../about.metadata";

export const metadata = aboutPageMetadata;

export default function AboutPage({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
