
import Hreo from "@/Components/Hero_com/hero";
import Sport from "@/Components/sport-Componente/Sport";
import MenCollection from "@/Components/Collection_com/Collection";
import Footer from "@/Components/footer/Footre";
import SportComponete from "@/Components/your_sport_start_here_componente/you_sport_componete";
import DiscoundComponent from "@/Components/discound_componente/discounds";
import HotCOMPONANTE from "@/Components/what_is_hot_componante/what_is_hot";
import NavAction from "@/Components/Navbar/NavAction";
import Feedback from "@/Components/feedback_component/feedback";
// import "aos/dist/aos.css";
export default async function Home() {
  return (
    <>
      <NavAction />
      <Feedback />
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
