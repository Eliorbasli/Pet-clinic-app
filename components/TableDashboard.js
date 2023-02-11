import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import { ColumnFilter } from "./ColumnFilter";

import Table from "./Table";

function TableDashboard() {
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

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("/api/patients");
      setData(result.data);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default TableDashboard;
