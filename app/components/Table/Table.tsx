"use client";
import { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Person, SortingDirection, TableProps } from "../../interfaces";
import { Pagination } from "../Pagination/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Modal } from "../Modal/Modal";
import { ModalContent } from "../Modal/ModalContent";
import { SearchField } from "../SearchField/SearchField";
import styles from "./Table.module.css";

export const Table = ({ people, planets }: TableProps) => {
  const data = people;
  const [isModalOpen, setIsModalOpen] = useState<string | false>(false);
  const [sorting, setSorting] = useState<SortingState>();
  const [nameFilterValue, setNameFilterValue] = useState("");
  const columnHelper = createColumnHelper<Person>();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (params.size > 0) {
      const sortingQuery = params.get("sortBy");
      if (sortingQuery) {
        const [id, query] = sortingQuery.split(":");
        setSorting([{ id, desc: query === SortingDirection.desc }]);
      }

      const filterQuery = params.get("name");
      if (filterQuery) setNameFilterValue(filterQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (!nameFilterValue && params.get("name")) {
      params.delete("name");
    }
    if (nameFilterValue) {
      params.set("name", nameFilterValue);
    }
    if ((!sorting || !sorting.length) && params.get("sortBy")) {
      params.delete("sortBy");
    }
    if (sorting && sorting.length > 0) {
      params.set(
        "sortBy",
        `${sorting[0].id}:${
          sorting[0].desc ? SortingDirection.desc : SortingDirection.asc
        }`
      );
    }

    router.push(pathname + "?" + params.toString());
  }, [pathname, searchParams, sorting, router, nameFilterValue]);

  const FormattedDate = ({ timestamp }: { timestamp: string }) => {
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return <span>{formattedDate}</span>;
  };

  const PlanetButton = ({ value }: { value: string }) => {
    return value !== "unknown" ? (
      <button
        onClick={() => setIsModalOpen(value)}
        className={styles.planetButton}
        style={{ "--color": planets[value].color }}
      >
        {value}
      </button>
    ) : (
      <img src="/question.png" alt="unknown data" />
    );
  };

  const FormatedTableValue = ({ value }: { value: string }) => {
    return value !== "unknown" ? (
      <span>{value}</span>
    ) : (
      <img src="/question.png" alt="unknown data" />
    );
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.name, {
        id: "name",
        cell: (info) => (
          <span>
            <b>{info.getValue()}</b>
          </span>
        ),
        header: () => <span>Name</span>,
      }),
      columnHelper.accessor((row) => row.mass, {
        id: "mass",
        cell: (info) => <FormatedTableValue value={info.getValue()} />,
        header: () => <span>Mass</span>,
      }),
      columnHelper.accessor((row) => row.height, {
        id: "height",
        cell: (info) => <FormatedTableValue value={info.getValue()} />,
        header: () => <span>Height</span>,
      }),
      columnHelper.accessor((row) => row.homeworld, {
        id: "homeworld",
        cell: (info) => <PlanetButton value={info.getValue()} />,
        header: () => <span>Homeworld</span>,
      }),
      columnHelper.accessor((row) => row.created, {
        id: "created",
        cell: (info) => <FormattedDate timestamp={info.getValue()} />,
        header: () => <span>Created at</span>,
      }),
      columnHelper.accessor((row) => row.edited, {
        id: "edited",
        cell: (info) => <FormattedDate timestamp={info.getValue()} />,
        header: () => <span>Edited at</span>,
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  const sortingOptions = {
    [SortingDirection.asc]: "/arrow-down.png",
    [SortingDirection.desc]: "/arrow-up.png",
    [SortingDirection.false]: "/unfold.png",
  };
  const nameColumn = table.getAllColumns().find((col) => col.id === "name");

  return (
    <>
      <SearchField
        setSearch={(e) => {
          setNameFilterValue(e.target.value);
          nameColumn?.setFilterValue(e.target.value);
        }}
        value={nameFilterValue}
      />
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className={`column-${header.id} ${styles.header}`}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          onClick={header.column.getToggleSortingHandler()}
                          className={styles.headerCell}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <img
                            src={
                              sortingOptions[
                                header.column.getIsSorted() as SortingDirection
                              ] ?? null
                            }
                            alt={`Sort column ${header.id}`}
                          />
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody className={styles.tbody}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.row}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.cell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal isOpen={!!isModalOpen} onClose={setIsModalOpen}>
          <ModalContent data={planets[isModalOpen]} />
        </Modal>
      )}
      <Pagination table={table} />
    </>
  );
};
