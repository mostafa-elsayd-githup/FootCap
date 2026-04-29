import styles from "./Woman_colliction.module.css";
import Section1 from "./section1/section1";
import Section2 from "./section2/section2";
import Woman_section from "./woman_section/woman_section";
import Discound_section from "./discound_product_section/discound_section";
import DiscoundComponent from "../man_colliction/discound_componente/discounds";
import Footer from "../../../footer/Footre";
import NavAction from "../../../Navbar/NavAction";
function Woman() {
  return (
    <>
      <NavAction />
      <div className={styles.Container}>
        {/* section1 */}
        <Section1 />
        {/* section2 */}
        <Section2 />
        {/* Woman_section */}
        <Woman_section />
        {/* discound_products_section */}
        <Discound_section />
        {/* discound_section  */}
        <DiscoundComponent />
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
export default Woman;
