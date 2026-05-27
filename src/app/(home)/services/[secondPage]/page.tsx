import ServicesSecondPage from "@/allPages/ServicesSecond";
import { getDBPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";

type PageProps = {
  params: Promise<{ secondPage: string }>;
};

type ServiceRow = RowDataPacket & {
  id: number;
  s2heading: string | null;
  s2para: string | null;
  s2endtag: string | null;
  img1: string | null;
  img2: string | null;
};

type CardRow = RowDataPacket & {
  id: number;
  title: string;
  description: string;
  link: string;
};

const page = async ({ params }: PageProps) => {
  const { secondPage } = await params;
  const pool = await getDBPool();

  const [services] = await pool.query<ServiceRow[]>(
    "SELECT id, s2heading, s2para, s2endtag, img1, img2 FROM services WHERE link = ?",
    [secondPage]
  );

  const service = services[0];

  const [cards] = service
    ? await pool.query<CardRow[]>(
        "SELECT id, title, description, link FROM service_second WHERE service_id = ?",
        [service.id]
      )
    : [[] as CardRow[]];

  const initialData = {
    s2heading: service?.s2heading ?? null,
    s2para: service?.s2para ?? null,
    s2endtag: service?.s2endtag ?? null,
    img1: service?.img1 ?? null,
    img2: service?.img2 ?? null,
    cards: cards.map((item) => ({
      ...item,
      link: `${secondPage}/${item.link}`,
    })),
  };

  return (
    <>
      {/* Preload critical resources for better LCP */}
      <link rel="preload" title="Services Second Banner" href="/service-images/services-second-banner.jpg" as="image" />
      <ServicesSecondPage initialData={initialData} />
    </>
  );
};

export default page;
