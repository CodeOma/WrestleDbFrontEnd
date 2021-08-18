import { Card, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Graph from "../components/Stats/Graph";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getTakedownStats } from "../controllers/controller";
import HeroBanner from "../components/components/homePage/HeroBanner";
import Features from "../components/components/homePage/Features";
import Services from "../components/components/homePage/Services";

const Home = () => {
  const [offGraph, setOffGraph] = useState({});
  const [defGraph, setDefGraph] = useState({});
  const [tagGraph, setTagGraph] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  return (
    <Grid container xs={12} direction='row'>
      {/* <h1>Home Page</h1> */}
      <HeroBanner />
      <Features />
      <Services />
      
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
