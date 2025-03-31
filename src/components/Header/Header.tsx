// src\components\Header\Header.tsx

import { Button } from "@gravity-ui/uikit";
import styles from "./Header.module.css";

type HeaderProps = {
  isAdmin: boolean;
  toggleAdmin: () => void;
};

const Header = ({ isAdmin, toggleAdmin }: HeaderProps) => (
  <header className={styles.header}>
    <h1>Список достопримечательностей</h1>
    <Button
      view={isAdmin ? "outlined-danger" : "action"}
      size="m"
      onClick={toggleAdmin}
    >
      {isAdmin
        ? "Выключить режим администратора"
        : "Включить режим администратора"}
    </Button>
  </header>
);

export default Header;
