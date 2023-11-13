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

export const Table = ({ people, planets }: TableProps) => {
  const [data, setData] = useState(people);
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

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.name, {
        id: "name",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Name</span>,
      }),
      columnHelper.accessor((row) => row.mass, {
        id: "mass",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Mass</span>,
      }),
      columnHelper.accessor((row) => row.height, {
        id: "height",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Height</span>,
      }),
      columnHelper.accessor((row) => row.homeworld, {
        id: "homeworld",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Homeworld</span>,
      }),
      columnHelper.accessor((row) => row.created, {
        id: "created",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Created at</span>,
      }),
      columnHelper.accessor((row) => row.edited, {
        id: "edited",
        cell: (info) => <i>{info.getValue()}</i>,
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
    [SortingDirection.asc]: "🔼",
    [SortingDirection.desc]: "🔽",
    [SortingDirection.false]: "🔽",
  };
  const nameColumn = table.getAllColumns().find((col) => col.id === "name");

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setNameFilterValue(e.target.value);
          nameColumn?.setFilterValue(e.target.value);
        }}
        placeholder={`Filter by name...`}
        value={nameFilterValue}
      />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div onClick={header.column.getToggleSortingHandler()}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {sortingOptions[
                            header.column.getIsSorted() as SortingDirection
                          ] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination table={table} />
    </>
  );
};
