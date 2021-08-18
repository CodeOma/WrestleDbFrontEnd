import React, { useState, useEffect } from "react";
import { getGeneralStats } from "../../controllers/controller";
import { Button, Grid, Card } from "@material-ui/core";
import { Link } from "react-router-dom";

import Graph from "../../components/Stats/Graph";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getTakedownStats } from "../../controllers/controller";
import Table from "./Table";
const GeneralStats = () => {
  const [offGraph, setOffGraph] = useState({});
  const [defGraph, setDefGraph] = useState({});
  const [tagGraph, setTagGraph] = useState({});
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

  const initGraph = (array, fn, currData) => {
    const obj = {
      data: [],
      labels: [],
    };
    array.forEach(t => {
      obj.labels.push(t._id ? t._id : "Other");
      obj.data.push(t.number);
    });
    fn({
      ...currData,
      labels: obj.labels,
      data: obj.data,
      array: [array],
    });
    console.log(offGraph);
  };
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);

        const fetch = await getTakedownStats();
        const data = await fetch.data;
        initGraph(data[0], setOffGraph, offGraph);
        initGraph(data[1], setDefGraph, defGraph);
        initGraph(data[2], setTagGraph, tagGraph);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchStats();
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const fetch = await getGeneralStats();
  //       setData(fetch.data);

  //       matches(fetch.data, setTableInfo, "stats");
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      {/* <Grid
        container
        className='p-3'
        s={7}
        style={{ backgroundColor: "white" }}
      >
        {isLoading ? <h2>Loading</h2> : <Table info={tableInfo} />}
      </Grid> */}
      <Grid container direction='row' xs={12} className='p-2'>
        <Grid container xs={4} justify='center' className='py-1'>
          {" "}
          <Link to='/wrestler' className='w-100'>
            <Card className='w-75 py-4 px-1 my-2'>
              <Grid className='w-100' container direction='column'>
                <h4>By Wrestler</h4>
              </Grid>
            </Card>
          </Link>
        </Grid>

        <Grid container xs={4} justify='center' className='px-1'>
          {" "}
          <Link to='/team' className='w-100'>
            <Card className='w-75 py-4 px-1 my-2'>
              <Grid className='w-100' container direction='column'>
                <h4>By Team</h4>
              </Grid>
            </Card>{" "}
          </Link>
        </Grid>

        <Grid container xs={4} justify='center' className='px-1'>
          {" "}
          <Link to='/technique' className='w-100'>
            <Card className='w-75 py-4 px-1 my-2'>
              <Grid className='w-100' container direction='column'>
                <h4>By Technique</h4>
              </Grid>
            </Card>{" "}
          </Link>
        </Grid>
      </Grid>
      <Grid container xs={12} direction='row' className='py-4 px-2 '>
        <Grid container xs={12} sm={4} className='px-1'>
          <Card className='p-2 w-100'>
            <h6> Top 10 Takedowns</h6>
            {isLoading ? <CircularProgress /> : <Graph tableData={offGraph} />}
          </Card>{" "}
        </Grid>
        <Grid container xs={12} sm={4} className='px-1'>
          <Card className='p-2 w-100'>
            <h6> Top 10 Def</h6>
            {isLoading ? <CircularProgress /> : <Graph tableData={defGraph} />}
          </Card>
        </Grid>
        <Grid container xs={12} sm={4} className='px-1'>
          <Card className='p-2 w-100'>
            <h6> Top 10 Tags/Setups</h6>
            {isLoading ? <CircularProgress /> : <Graph tableData={tagGraph} />}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default GeneralStats;
