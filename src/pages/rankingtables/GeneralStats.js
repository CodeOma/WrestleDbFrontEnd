import React, { useState, useEffect } from "react";
import { getGeneralStats } from "../../controllers/controller";
import { Button, Grid } from "@material-ui/core";
import Table from "./Table";
const GeneralStats = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tableInfo, setTableInfo] = useState({});

  const matches = (array, func, currData) => {
    const rows = array.map((field, i) => {
      return { id: i, url: field.url, ...field };
    });

    const columns = [
      { field: "fullName", headerName: "Name", width: 180, type: "string" },
      {
        field: "totalMatches",
        headerName: "Matches",
        width: 80,
        type: "number",
      },
      { field: "wins", headerName: "Wins", width: 80, type: "number" },
      { field: "losses", headerName: "Losses", width: 80, type: "number" },
      {
        field: "totalPS",
        headerName: "Total Points Scored",
        width: 120,
        type: "number",
      },
      {
        field: "totalPC",
        headerName: "Total Points Conceded",
        width: 120,
        type: "number",
      },
      {
        field: "avgPSPM",
        headerName: "Avg Score Per Match",
        width: 120,
        type: "number",
      },
      //   { field: "wonMatchLength", headerName: "Avg win length", width: 100 },
      //   { field: "matchesScoreFirst", headerName: "Scored First", width: 100 },
      //   { field: "matchesScoreLast", headerName: "Scored Last", width: 100 },
      {
        field: "pspcRatio",
        headerName: "Scored/Conceded",
        width: 120,
        type: "number",
      },
      {
        field: "scoreFirstPerc",
        headerName: "Score First %",
        width: 120,
        type: "number",
      },
      {
        field: "scorelastPerc",
        headerName: "Score Last %",
        width: 120,
        type: "number",
      },
      {
        field: "winPercentage",
        headerName: "Win %",
        width: 70,
        type: "number",
      },
    ];
    func({
      title: currData,
      columns,
      rows,
      // array: [array],
    });
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetch = await getGeneralStats();
        setData(fetch.data);

        matches(fetch.data, setTableInfo, "stats");
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Grid container className='p-3' s={7}>
        <h1>general stats</h1>

        {isLoading ? <h2>Loading</h2> : <Table info={tableInfo} />}
      </Grid>
      <Button onClick={() => console.log(data)}> click</Button>
    </div>
  );
};

export default GeneralStats;
