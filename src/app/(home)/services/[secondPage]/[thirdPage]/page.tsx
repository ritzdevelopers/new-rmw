import React from "react";
import ServiceThirdMainPage from "@/allPages/serviceThirdPage/ServiceThirdMainPage";
import ServiceThirdMainPage2 from "@/allPages/serviceThirdPage/ServiceThirdMainPage2";

const Page = async ({
  params,
}: {
  params: Promise<{ secondPage: string; thirdPage: string }>;
}) => {
  const { secondPage, thirdPage } = await params;
  console.log(secondPage, thirdPage, "These are the route parameters");

  return (
    <div>
      {thirdPage === "newspaper-ad-rates" ? (
        <ServiceThirdMainPage2 />
      ) : (
        <ServiceThirdMainPage />
      )}
    </div>
  );
};

export default Page;