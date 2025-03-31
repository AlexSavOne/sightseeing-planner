// src/components/AttractionStats/AttractionStats.tsx

import { Card } from "@gravity-ui/uikit";
import styles from "./AttractionStats.module.css";

type AttractionStatsProps = {
  stats: {
    total: number;
    visited: number;
    planned: number;
  };
};

const AttractionStats = ({ stats }: AttractionStatsProps) => {
  return (
    <div className={styles.statsContainer}>
      {/* Карточка с общей статистикой */}
      <Card theme="normal" view="filled" className={styles.card}>
        <div className={styles.statLabel}>Всего</div>
        <div className={styles.statValue}>{stats.total}</div>
      </Card>

      {/* Карточка с количеством посещённых достопримечательностей */}
      <Card theme="normal" view="filled" className={styles.card}>
        <div className={styles.statLabel}>Посещено</div>
        <div className={styles.statValue}>{stats.visited}</div>
      </Card>

      {/* Карточка с количеством планируемых достопримечательностей */}
      <Card theme="normal" view="filled" className={styles.card}>
        <div className={styles.statLabel}>В планах</div>
        <div className={styles.statValue}>{stats.planned}</div>
      </Card>
    </div>
  );
};

export default AttractionStats;
