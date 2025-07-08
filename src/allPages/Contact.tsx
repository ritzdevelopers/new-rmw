import Form from "./Contactpage/Form";
import Footer from "@/components/footer/Footer";
import PagesBanner from "@/components/pagesBanner/PagesBanner";

const Contact = () => {
  return (
    <>
      <PagesBanner
        headingTitle={"Contact Us"}
        videoURL={"/videos/bg_pattern.mp4"}
        mtP={"80px"}
        mtS={"50px"}
      />
      <Form />
      <Footer />
    </>
  );
};

export default Contact;
