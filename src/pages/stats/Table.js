import React, { useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
} from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "1000",
  },
  table: {
    fontSize: 12,
    width: "auto",
  },
}));

export default function DataTable({ info }) {
  const classes = useStyles();

  useEffect(() => {
    console.log(info);
  }, [info]);

  // Toolbar: GridToolbar,
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridColumnsToolbarButton />
        <GridFilterToolbarButton />
      </GridToolbarContainer>
    );
  };
  return (
    <div style={{ width: "100%" }}>
      <h1>{info.title}</h1>
      {info.rows && (
        <DataGrid
          components={{
            // Pagination: CustomPagination,
            Toolbar: CustomToolbar,
          }}
          disableColumnMenu
          // disableColumnSelector={true}
          ColumnResizeIcon='true'
          density='compact'
          autoHeight='true'
          className={classes.table}
          rows={info.rows}
          columns={info.columns}
          pageSize={10}
        />
      )}
    </div>
  );
}
