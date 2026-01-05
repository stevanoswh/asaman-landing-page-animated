import { Navbar } from "@/components/layout/navbar-white";
import { FaqSection } from "../_components/faq";
import { FindSchoolPortalSection } from "./_components/find-school-portal";


export default function Home() {
  return (
    <div>
        
         <Navbar/>
         <FindSchoolPortalSection/>
         <FaqSection/>
    </div>
   
  );
}
