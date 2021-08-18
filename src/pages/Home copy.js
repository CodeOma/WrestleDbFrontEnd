import { Card, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Graph from "../components/Stats/Graph";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getTakedownStats } from "../controllers/controller";
import HeroBanner from "../components/components/HeroBanner";
import Features from "../components/components/Features";

const Home = () => {
  const [offGraph, setOffGraph] = useState({});
  const [defGraph, setDefGraph] = useState({});
  const [tagGraph, setTagGraph] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
  return (
    <Grid container xs={12} direction='row'>
      {/* <h1>Home Page</h1> */}
      <HeroBanner />
      <Features />
      <Grid
        container
        direction='row'
        xs={12}
        className='p-2'
        style={{ height: "10rem" }}
      >
        <Grid container xs={4} justify='center' className='px-1'>
          {" "}
          <Link to='/techniques' className='w-100'>
            <Card className='w-100 py-4 px-1 my-2'>
              <Grid className='w-100' container direction='column'>
                <h4>Database</h4>
              </Grid>
            </Card>
          </Link>
        </Grid>

        <Grid container xs={4} justify='center' className='px-1'>
          {" "}
          <Link to='/database' className='w-100'>
            <Card className='w-100 py-4 px-1 my-2'>
              <Grid className='w-100' container direction='column'>
                <h4>Matches</h4>
              </Grid>
            </Card>{" "}
          </Link>
        </Grid>

        <Grid container xs={4} justify='center' className='px-1'>
          {" "}
          <Link to='/database' className='w-100'>
            <Card className='w-100 py-4 px-1 my-2'>
              <Grid className='w-100' container direction='column'>
                <h4>Wrestlers</h4>
              </Grid>
            </Card>{" "}
          </Link>
        </Grid>
      </Grid>
      <Grid container xs={12} direction='row' className='p-1 '>
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
      {/* <Grid container xs={8}>
        <Grid container justify='center'>
          {" "}
          <Card className='w-100 h-100 p-4 m-2'>
            <Grid className='w-100' container direction='column'>
              <h4>Wrestlers</h4>
              
            </Grid>
          </Card>
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default Home;
