
import Hreo from "@/app/Hero/hero";
import Sport from "@/app/sport-Componente/Sport";
import MenCollection from "@/app/Collection/Collection";
import Footer from "@/Components/footer/Footre";
import SportComponete from "@/app/your_sport_start_here_componente/you_sport_componete";
import DiscoundComponent from "@/Components/discound_componente/discounds";
import HotCOMPONANTE from "@/app/what_is_hot_componante/what_is_hot";
import NavAction from "@/Components/Navbar/NavAction";
// import "aos/dist/aos.css";
export default function Home() {

  return (
    <>
      <NavAction />
      <Hreo />
      <Sport />
      <MenCollection />
      <SportComponete />
      <HotCOMPONANTE />
      <DiscoundComponent />
      <Footer />
    </>
  );
}
