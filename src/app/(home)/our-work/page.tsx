import ProjectCards from "@/allPages/projectsPage/ProjectCards"
import Footer from "@/components/footer/Footer"
import PagesBanner from "@/components/pagesBanner/PagesBanner"



const page = () => {
  return (
    <>
      <PagesBanner headingTitle={"Our work"}/>
      <ProjectCards />
      <Footer />
    </>
  )
}

export default page
