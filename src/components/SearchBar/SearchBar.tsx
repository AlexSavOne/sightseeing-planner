// src\components\SearchBar\SearchBar.tsx

import { TextInput } from "@gravity-ui/uikit";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className={styles.searchContainer}>
      <label htmlFor="searchInput" className={styles.searchLabel}>
        Поиск по названию или описанию
      </label>
      <TextInput
        id="searchInput"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Введите название или описание"
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
