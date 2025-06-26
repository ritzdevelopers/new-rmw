import About from "@/allPages/About";

const page = () => {
  return (
   <About/>
  );
};

export default page;


// "use client"; // ✅ Ensure this is at the top

// import { useSplitText } from "@/hooks/useSplitText";

// const AboutFirst = () => {
//   const textRefs = useSplitText(); // ✅ Now it works fine

//   return <div>About First Section</div>;
// };

// export default AboutFirst;
