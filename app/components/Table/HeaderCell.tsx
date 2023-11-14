import { flexRender, Column, HeaderContext } from "@tanstack/react-table";
import { Person, SortDirection } from "../../interfaces";
import styles from "./Table.module.css";
import { SortIcon } from "../SortIcon/SortIcon";

export const HeaderCell = ({
  id,
  col,
  size,
  context,
}: {
  id: string;
  col: Column<Person>;
  size: number;
  context: HeaderContext<Person, unknown>;
}) => (
  <th key={id} className={styles.headerCell} style={{ width: size }}>
    <div onClick={col.getToggleSortingHandler()}>
      {flexRender(col.columnDef.header, context)}
      {col.getCanSort() && (
        <SortIcon dir={col.getIsSorted() as SortDirection} id={id} />
      )}
    </div>
  </th>
);
