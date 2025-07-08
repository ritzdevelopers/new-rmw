import ProjectCards from "@/allPages/projectsPage/ProjectCards"
import Footer from "@/components/footer/Footer"
import PagesBanner from "@/components/pagesBanner/PagesBanner"



const page = () => {
  return (
    <section style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <PagesBanner
            headingTitle={"Our Work"}
            videoURL={"/videos/bg_pattern.mp4"}
            mtP={"120px"}
            mtS={"100px"}
            sH={"10vh"}
          />
      <ProjectCards />
      <Footer />
    </section>
  )
}

export default page
