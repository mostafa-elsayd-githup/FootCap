import Hreo from "./Components/Hero/hero";
import Sport from "./Components/sport-Componente/Sport";
import MenCollection from "./Components/Collection/Collection"
import Footer from "./footer/Footre";
import SportComponete from "./Components/your_sport_start_here_componente/you_sport_componete";
import DiscoundComponent from "./Components/Collection/man_colliction/discound_componente/discounds";
import HotCOMPONANTE from "./Components/what_is_hot_componante/what_is_hot";
import NavAction from "./Navbar/NavAction";
import "aos/dist/aos.css"; // <--- استيراد ملف CSS الخاص بـ AOS
export default function Home() {

  return (
    <>
    <NavAction/>
      <Hreo />
      <Sport />
      <MenCollection />
      {/* <Producte /> */}
      <SportComponete />
      {/* <Nike_Special /> */}
      <HotCOMPONANTE />
      <DiscoundComponent />
      <Footer />
    </>
  );
}
