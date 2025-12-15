import { Navbar } from "@/components/layout/navbar-white";
import { FaqSection } from "../_components/faq";
import { PrivacyPolicySection } from "./_components/privacy-policy";


export default function Home() {
  return (
    <div>
        
         <Navbar/>
         <PrivacyPolicySection/>
        <FaqSection/>
    </div>
   
  );
}
