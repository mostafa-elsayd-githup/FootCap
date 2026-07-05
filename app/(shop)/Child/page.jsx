import styles from "./Chilld.module.css";
import Section1 from "./section1/section1";
import Section2 from "./section2/section2";
import Section3 from "./section3/section3";
import DiscoundComponent from "@/Components/discound_componente/discounds";
function Chilld() {
  return (
      <div className={styles.Container}>
        <Section1 />
        <Section2 />
        <Section3/>
        <DiscoundComponent/>
      </div>
  );
}
export default Chilld;
