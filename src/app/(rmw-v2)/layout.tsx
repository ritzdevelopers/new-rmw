import "./styles/tailwind.css";
import "./styles/global.css";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import ContactBtns from "./new-home/components/ContactBtns";

export default function NewRMWW({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar></Navbar>
      {children}
     
      <ContactBtns />
      <Footer></Footer>
    </>
  );
}