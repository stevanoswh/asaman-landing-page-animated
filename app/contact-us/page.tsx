import { Navbar } from "@/components/layout/navbar-white";
import { ContactUs } from "./_components/contact-us";
import { FaqSection } from "../_components/faq";


export default function Home() {
  return (
    <div>
         <Navbar/>
        <ContactUs/>
        <FaqSection/>
    </div>
   
  );
}
