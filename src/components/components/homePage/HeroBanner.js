import React from "react";
import "../../../assets/styles.css";
import piechart from "../../../assets/images/pie-chart-4051.png";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <Grid container className='p-4 herobanner' direction='row'>
      <Grid container xs={6} className='p-4'>
        <Grid className='home-text' style={{ zIndex: "1" }}>
          {/* <Grid className='section-text__subtitle'>App landing page</Grid> */}
          <Grid className='pt-4 section-text__title-big'>
            Technique Database and Stats{" "}
          </Grid>
          <Grid className='section-text__body'>
            This project is to help get stats on wrestling. I making it while I
            am learning to program.
          </Grid>
          <Grid className='download-btn'>
            <Link to='/signup'>Sign Up</Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid container xs={6} className='p-4' style={{ width: "50%" }}>
        <Grid xs={12} className='w-75' style={{ width: "75%", height: "75%" }}>
          <img src={piechart} alt='Pie chart' width='100%' />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HeroBanner;
