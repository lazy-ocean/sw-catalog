"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  Row,
} from "@tanstack/react-table";
import { Table as TableInterface } from "@tanstack/react-table";
import { useVirtual } from "react-virtual";
import { Person, SortDirection, TableProps } from "../../interfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Modal } from "../Modal/Modal";
import { ModalContent } from "../Modal/ModalContent";
import { SearchField } from "../SearchField/SearchField";
import styles from "./Table.module.css";
import { formatDate, formatNumberValue } from "../../utils/formatters";
import { PlanetButton } from "../PlanetButton/PlanetButton";
import { sortPlanets } from "../../utils/sortPlanets";
import { HeaderCell } from "./HeaderCell";
import { TableRow } from "./Row";

const FormatedTableValue = ({ value }: { value: number }) => {
  return value ? (
    <span>{value}</span>
  ) : (
    <img
      src="/question.png"
      alt="unknown data"
      className={styles.unknownIcon}
    />
  );
};

export const Table = ({ people, planets }: TableProps) => {
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

    if (params?.size > 0) {
      const sortingQuery = params.get("sortBy");
      if (sortingQuery) {
        const [id, query] = sortingQuery.split(":");
        setSorting([{ id, desc: query === SortDirection.desc }]);
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
          sorting[0].desc ? SortDirection.desc : SortDirection.asc
        }`
      );
    }

    if (params?.size > 0) {
      router.push(pathname + "?" + params.toString());
    }
  }, [pathname, searchParams, sorting, router, nameFilterValue]);

  const columns = useMemo(
    () => [
      {
        Header: "No",
        id: "id",
        maxSize: 10,
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
      columnHelper.accessor((row) => formatNumberValue(row.mass), {
        id: "mass",
        cell: (info) => <FormatedTableValue value={info.getValue()} />,
        header: () => <span>Mass</span>,
      }),
      columnHelper.accessor((row) => formatNumberValue(row.height), {
        id: "height",
        cell: (info) => <FormatedTableValue value={info.getValue()} />,
        header: () => <span>Height</span>,
      }),
      columnHelper.accessor((row) => row.homeworld, {
        id: "homeworld",
        cell: ({ row, getValue }) => {
          const planetId = getValue();
          return (
            <PlanetButton
              value={planetId}
              id={row.original.homeworldId}
              color={planets[row.original.homeworldId].color}
              handleClick={setIsModalOpen}
            />
          );
        },
        header: () => <span>Homeworld</span>,
        sortingFn: "customSorting",
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
    data: people,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    sortingFns: {
      customSorting: sortPlanets,
    },
  });

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
    estimateSize: useCallback(() => 80, []),
  });

  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const nameColumn = table.getAllColumns().find((col) => col.id === "name");

  // to ensure correct virtualized scrolling
  const spacerTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const spacerEnd =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <>
      <SearchField
        setSearch={(value) => {
          setNameFilterValue(value);
          nameColumn?.setFilterValue(value);
        }}
        value={nameFilterValue}
      />
      <div ref={tableContainerRef} className={styles.container}>
        {virtualRows.length ? (
          <table className={styles.table} data-testid="sw-table">
            <thead className={styles.header}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <HeaderCell
                      id={header.id}
                      col={header.column}
                      size={header.getSize()}
                      context={header.getContext()}
                      key={header.id}
                    />
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className={styles.tbody}>
              {spacerTop > 0 && <tr style={{ height: `${spacerTop}px` }}></tr>}
              {virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index];
                return <TableRow data={rows[virtualRow.index]} key={row.id} />;
              })}
              {spacerEnd > 0 && <tr style={{ height: `${spacerEnd}px` }} />}
            </tbody>
          </table>
        ) : (
          <span className={styles.noResultsMsg}>
            No results for your query, please try something else
          </span>
        )}
      </div>
      {isModalOpen && (
        <Modal isOpen={!!isModalOpen} onClose={setIsModalOpen}>
          <ModalContent
            data={planets[isModalOpen]}
            color={planets[isModalOpen].color}
          />
        </Modal>
      )}
    </>
  );
};
