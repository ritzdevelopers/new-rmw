import ServiceMainPage from "@/allPages/serviceMainpage/ServiceMainPage";

const service = () => {
  return (
    <>
      {/* Preload critical resources for better LCP */}
      <link rel="preload" href="/service-images/services-banner.jpg" as="image" />
      <ServiceMainPage />
    </>
  );
};

export default service;