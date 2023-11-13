"use client";
import { useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Person, SortingDirection, TableProps } from "../../interfaces";
import { Pagination } from "../Pagination/Pagination";

export const Table = ({ people, planets }: TableProps) => {
  const [data, setData] = useState(people);
  const [sorting, setSorting] = useState<SortingState>();
  const columnHelper = createColumnHelper<Person>();

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

  return (
    <>
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
