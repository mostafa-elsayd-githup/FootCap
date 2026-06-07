import styles from "./Chilld.module.css";
import Section1 from "./section1/section1";
import Section2 from "./section2/section2";
import Section3 from "./section3/section3";
import DiscoundComponent from "@/Components/discound_componente/discounds";
import Footer from "@/Components/footer/Footre";
import NavAction from "@/Components/Navbar/NavAction";
function Chilld() {
  return (
    <>
    <NavAction/>
      <div className={styles.Container}>
        <Section1 />
        <Section2 />
        <Section3/>
        <DiscoundComponent/>
        <Footer/>
      </div>
    </>
  );
}
export default Chilld;
