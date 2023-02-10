import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import { ColumnFilter } from "./ColumnFilter";

import Table from "./Table";

function Table1() {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "ownerName",
        Filter: ColumnFilter,
      },
      {
        Header: "Phone",
        accessor: "phoneNumber",
        Filter: ColumnFilter,
      },
      {
        Header: "Pet Name",
        accessor: "petName",
        Filter: ColumnFilter,
      },
      {
        Header: "Pet Age",
        accessor: "petDOB",
        Filter: ColumnFilter,
      },
      {
        Header: "Pet Type",
        accessor: "petType",
        Filter: ColumnFilter,
      },
    ],
    []
  );

  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios("/api/patients");
      setData(result.data);
      // console.log(result.data);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default Table1;
