import ProjectCards from "@/allPages/projectsPage/ProjectCards"
import Footer from "@/components/footer/Footer"
import PagesBanner from "@/components/pagesBanner/PagesBanner"



const page = () => {
  return (
    <>
      <PagesBanner
            headingTitle={"Our Work"}
            videoURL={"/videos/bg_pattern.mp4"}
            mtP={"80px"}
            mtS={"50px"}
          />
      <ProjectCards />
      <Footer />
    </>
  )
}

export default page
