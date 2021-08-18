import React from "react";
import "../../../assets/styles.css";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
function HeroBanner() {
  return (
    <Grid container className='p-4 herobanner' direction='row'>
      <Grid container xs={6} className='p-4'>
        <Grid className='home-text'>
          {/* <Grid className='section-text__subtitle'>App landing page</Grid> */}
          <Grid className='pt-4 section-text__title-big'>
            Something about website
          </Grid>
          <Grid className='section-text__body'>
            Dorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusm
            tempor incididunt ulabore et dolore magna aliqua.
          </Grid>
          <Grid className='download-btn'>
            <Link to='/signup'>Sign Up</Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid container xs={6} className='p-4'>
        SOME PICTURE
      </Grid>
    </Grid>
  );
}

export default HeroBanner;
