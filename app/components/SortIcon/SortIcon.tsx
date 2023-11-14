import { SortDirection } from "../../interfaces";
import styles from "./SortIcon.module.css";

const sortIcons = {
  [SortDirection.asc]: "/arrow-down.png",
  [SortDirection.desc]: "/arrow-up.png",
  [SortDirection.false]: "/unfold.png",
};

export const SortIcon = ({ dir, id }: { dir: SortDirection; id: string }) => (
  <img
    src={sortIcons[dir]}
    alt={`Sort column ${id}`}
    className={styles.sortBtn}
  />
);
