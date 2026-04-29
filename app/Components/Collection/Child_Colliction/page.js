import styles from "./Chilld.module.css";
import Section1 from "./section1/section1";
import Section2 from "./section2/section2";
import Section3 from "./section3/section3";
import DiscoundComponent from "../man_colliction/discound_componente/discounds";
import Footer from "../../../footer/Footre";
import NavAction from "../../../Navbar/NavAction";
function Chilld() {
  return (
    <>
    <NavAction/>
      <div className={styles.Container}>
        {/* section1 */}
        <Section1 />
        {/* section2 */}
        <Section2 />
        {/* section3 */}
        <Section3/>
        {/* section4 */}
        <DiscoundComponent/>
        {/* footer */}
        <Footer/>
      </div>
    </>
  );
}
export default Chilld;
