import React from "react";
import styles from "./Main.module.css";
import { TableProps } from "../../interfaces";
import { Table } from "../Table/Table";

const Main = ({ people, planets }: TableProps) => {
  return (
    <main className={styles.header}>
      <h3>Star Wars People catalogue ✨</h3>
      {people && <Table people={people} planets={planets} />}
    </main>
  );
};

export default Main;
