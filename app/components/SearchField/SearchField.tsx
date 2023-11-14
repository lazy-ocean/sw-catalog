import styles from "./SearchField.module.css";

export const SearchField = ({
  setSearch,
  value,
}: {
  setSearch: (e: string) => void;
  value: string;
}) => (
  <div className={styles.searchWrapper}>
    <img src="./search.png" alt="Search Icon" className={styles.searchIcon} />
    <input
      type="text"
      onChange={(e) => setSearch(e.target.value)}
      placeholder={`Filter by name...`}
      value={value}
      className={styles.input}
    />
    <button onClick={() => setSearch("")}>
      <img src="/close.png" alt="Clear your search" />
    </button>
  </div>
);
