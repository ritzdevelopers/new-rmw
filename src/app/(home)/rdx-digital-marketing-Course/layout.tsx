import Footer from "@/components/footer/Footer";

export default async function RDXDigitalMarketing({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <>{children}</>
      <Footer></Footer>
    </>
  );
}
