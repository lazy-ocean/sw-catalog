import { flexRender, Row } from "@tanstack/react-table";
import { Person } from "../../interfaces";
import styles from "./Table.module.css";

export const TableRow = ({ data }: { data: Row<Person> }) => (
  <tr key={data.id} className={styles.row}>
    {data.getVisibleCells().map((cell) => (
      <td key={cell.id} className={styles.cell}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </td>
    ))}
  </tr>
);
