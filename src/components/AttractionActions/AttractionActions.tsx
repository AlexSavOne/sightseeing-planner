// src\components\AttractionActions\AttractionActions.tsx

import { Button } from "@gravity-ui/uikit";
import styles from "./AttractionActions.module.css";

type AttractionActionsProps = {
  isAdmin: boolean;
  handleAdd: () => void;
  hideVisited: boolean;
  setHideVisited: (hide: boolean) => void;
};

const AttractionActions = ({
  isAdmin,
  handleAdd,
  hideVisited,
  setHideVisited,
}: AttractionActionsProps) => {
  return (
    <div className={styles.actionsContainer}>
      {isAdmin && (
        <Button view="action" onClick={handleAdd} className={styles.addButton}>
          Добавить достопримечательность
        </Button>
      )}

      <Button
        onClick={() => setHideVisited(!hideVisited)}
        view="action"
        className={styles.hideVisitedButton}
      >
        {hideVisited ? "Показать осмотренные" : "Скрыть осмотренные"}
      </Button>
    </div>
  );
};

export default AttractionActions;
