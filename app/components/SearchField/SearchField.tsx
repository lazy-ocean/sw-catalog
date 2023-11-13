import styles from "./SearchField.module.css";

export const SearchField = ({
  setSearch,
  value,
}: {
  setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) => (
  <div className={styles.searchWrapper}>
    <img src="./search.png" alt="Search Icon" className={styles.searchIcon} />
    <input
      type="text"
      onChange={setSearch}
      placeholder={`Filter by name...`}
      value={value}
      className={styles.input}
    />
  </div>
);
