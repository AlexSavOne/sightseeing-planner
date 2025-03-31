import { Button } from "@gravity-ui/uikit";
import Attractions from "../components/Attraction/Attractions";
import styles from "./Home.module.css";

type HomeProps = {
  isAdmin: boolean;
  toggleAdmin: () => void;
};

const Home = ({ isAdmin, toggleAdmin }: HomeProps) => (
  <div>
    <h1>Список достопримечательностей</h1>
    <Button
      view={isAdmin ? "outlined-danger" : "action"}
      size="m"
      onClick={toggleAdmin}
      className={styles.adminButton}
    >
      {isAdmin
        ? "Выключить режим администратора"
        : "Включить режим администратора"}
    </Button>
    <Attractions isAdmin={isAdmin} />
  </div>
);

export default Home;
