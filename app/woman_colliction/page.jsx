"use server"
import Section1 from "./section1/section1";
import Section2 from "./section2/section2";
import Woman_section from "./woman_section/woman_section";
import Discound_section from "./discound_product_section/discound_section";
import DiscoundComponent from "@/Components/discound_componente/discounds";
import Footer from "@/Components/footer/Footre";
import NavAction from "@/Components/Navbar/NavAction";
function Woman() {
  return (
    <>
      <NavAction />
      <div >
        <Section1 />
        <Section2 />
        <Woman_section />
        <Discound_section />
        <DiscoundComponent />
        <Footer />
      </div>
    </>
  );
}
export default Woman;
