"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  Row,
} from "@tanstack/react-table";
import { Table as TableInterface } from "@tanstack/react-table";
import { useVirtual } from "react-virtual";
import { Person, SortingDirection, TableProps } from "../../interfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Modal } from "../Modal/Modal";
import { ModalContent } from "../Modal/ModalContent";
import { SearchField } from "../SearchField/SearchField";
import styles from "./Table.module.css";
import { formatDate } from "../../utils/formatDate";

const FormatedTableValue = ({ value }: { value: string }) => {
  return value !== "unknown" ? (
    <span>{value}</span>
  ) : (
    <img src="/question.png" alt="unknown data" />
  );
};

export const Table = ({ people, planets }: TableProps) => {
  const data = people;
  const [isModalOpen, setIsModalOpen] = useState<string | false>(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [nameFilterValue, setNameFilterValue] = useState("");
  const columnHelper = createColumnHelper<Person>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const tableContainerRef = useRef<HTMLDivElement>(null);
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

  const PlanetButton = ({ value }: { value: string }) => {
    return value !== "unknown" ? (
      <button
        onClick={() => setIsModalOpen(value)}
        className={styles.planetButton}
        style={{ ["--color" as string]: planets[value].color }}
      >
        {value}
      </button>
    ) : (
      <img src="/question.png" alt="unknown data" />
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "No",
        id: "id",
        cell: ({
          row,
          table,
        }: {
          row: Row<Person>;
          table: TableInterface<Person>;
        }) => (
          <span>
            {(table
              .getSortedRowModel()
              ?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) +
              1}
          </span>
        ),
      },
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
        cell: (info) => <span>{formatDate(info.getValue())}</span>,
        header: () => <span>Created at</span>,
      }),
      columnHelper.accessor((row) => row.edited, {
        id: "edited",
        cell: (info) => <span>{formatDate(info.getValue())}</span>,
        header: () => <span>Edited at</span>,
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columnHelper]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });

  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const sortingOptions = {
    [SortingDirection.asc]: "/arrow-down.png",
    [SortingDirection.desc]: "/arrow-up.png",
    [SortingDirection.false]: "/unfold.png",
  };
  const nameColumn = table.getAllColumns().find((col) => col.id === "name");

  // to ensure correct scrolling
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <>
      <SearchField
        setSearch={(e) => {
          setNameFilterValue(e.target.value);
          nameColumn?.setFilterValue(e.target.value);
        }}
        value={nameFilterValue}
      />
      <div ref={tableContainerRef} className={styles.container}>
        {virtualRows.length ? (
          <table className={styles.table}>
            <thead className={styles.header}>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          className={`column-${header.id} ${styles.headerCell}`}
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              onClick={header.column.getToggleSortingHandler()}
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
              {paddingTop > 0 && (
                <tr>
                  <td style={{ height: `${paddingTop}px` }} />
                </tr>
              )}
              {virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                  <tr key={row.id} className={styles.row}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className={styles.cell}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              {paddingBottom > 0 && (
                <tr>
                  <td style={{ height: `${paddingBottom}px` }} />
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <span className={styles.noResultsMsg}>
            No results by your query, please try something else
          </span>
        )}
      </div>
      {isModalOpen && (
        <Modal isOpen={!!isModalOpen} onClose={setIsModalOpen}>
          <ModalContent data={planets[isModalOpen]} />
        </Modal>
      )}
    </>
  );
};
