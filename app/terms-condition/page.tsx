import { Navbar } from "@/components/layout/navbar-white";
import { FaqSection } from "../_components/faq";
import { TermsConditionsSection } from "./_components/terms-conditions";


export default function Home() {
  return (
    <div>
         <Navbar/>
         <TermsConditionsSection/>
         <FaqSection/>
    </div>
   
  );
}
