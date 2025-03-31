// src\components\AttractionActions\AttractionActions.tsx

import { Button, Switch } from "@gravity-ui/uikit";
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
        <Button
          view="action"
          size="m"
          onClick={handleAdd}
          className={styles.addButton}
        >
          Добавить достопримечательность
        </Button>
      )}

      <Switch checked={hideVisited} onUpdate={setHideVisited}>
        {hideVisited ? "Показать осмотренные" : "Скрыть осмотренные"}
      </Switch>
    </div>
  );
};

export default AttractionActions;
