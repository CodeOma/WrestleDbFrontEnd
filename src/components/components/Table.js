import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";

export default function DataTable({ info }) {
  useEffect(() => {
    console.log(info);
  }, [info]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      {/* <h1>{info.title}</h1> */}

      <DataGrid rows={info.rows} columns={info.columns} pageSize={5} />
    </div>
  );
}
