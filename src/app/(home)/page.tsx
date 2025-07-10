import Elementor from "@/allPages/Elementor";
import { Providers } from "../provider/Provider";

// import { BlogProvider } from "@/blogContext/BlogContext";
export default function Home() {
  return (
    // <BlogProvider>
    <Providers>
    <Elementor /></Providers>
  // </BlogProvider>
  );
}
