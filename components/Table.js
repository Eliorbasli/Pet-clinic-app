import React, { useState, Fragment } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import { getAgeFromDate } from "../utils/getAgeFromDate";
import {
  IoArrowDownOutline,
  IoArrowUpOutline,
  IoPencilSharp,
} from "react-icons/io5";
import Modal from "./Modal";

export default function Table({ columns, data }) {
  const [showModal, setShowModal] = useState(false);
  const i = 0;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },

    useFilters,
    useSortBy
  );

  const [filterInput, setFilterInput] = useState("");
  const [editPatient, setEditPatient] = useState(null);

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("show.name", value);
    setFilterInput(value);
  };

  return (
    <>
      <div className="mt-4 flex flex-col ">
        <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-400 sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-500">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          key={i}
                          className="px-6 bg-gray500 py-3 text-center align-top text-xs font-medium uppercase tracking-wider truncate"
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <IoArrowUpOutline />
                              ) : (
                                <IoArrowDownOutline />
                              )
                            ) : (
                              ""
                            )}
                          </span>
                          <div>
                            {column.Header === "Name" ||
                            column.Header === "Pet Name"
                              ? column.render("Filter")
                              : null}
                          </div>
                        </th>
                      ))}
                      <th className="bg-gray500 py-3 text-center align-top text-xs font-medium uppercase tracking-wider truncate">
                        Edit
                      </th>
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-gray300 divide-y divide-gray-200"
                >
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} key={i}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-4 whitespace-nowrap"
                              key={i}
                            >
                              {cell.column.Header == "Pet Age"
                                ? getAgeFromDate(cell.value)
                                : cell.render("Cell")}

                              {/* {i++} */}
                            </td>
                          );
                        })}
                        <td>
                          <button
                            className="h-10 px-6 font-semibold"
                            type="submit"
                            onClick={() => {
                              setShowModal(true);
                              setEditPatient(row.original);
                              console.log("edit clicked");
                            }}
                          >
                            <IoPencilSharp />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Modal
                isVisible={showModal}
                editPatient={editPatient}
                onClose={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
