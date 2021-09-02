import React from "react";
import "../../../assets/styles.css";
import wrestle from "../../../assets/images/wrestlin.png";
import bargraph from "../../../assets/images/arrow-chart-8400.png";

import databasePic from "../../../assets/images/database.png";

import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
function Services() {
  return (
    <Grid
      container
      className='p-4'
      direction='row'
      justify='center'
      style={{ background: "#f7fcfc" }}
    >
      <Grid className='section-text'>
        <Grid className='section-text__title-centered'></Grid>
        <Grid className='service-cards'>
          <Grid className='service-card'>
            <Link to='/techniques'>
              <Grid className='p-2' style={{ height: "10", width: "200" }}>
                <img
                  src={databasePic}
                  alt='profiles'
                  width='70%'
                  height='50%'
                />
              </Grid>
            </Link>
            <Grid className='service-card__text-container'>
              <Grid className='section-text__title-small'>Database</Grid>
              <Grid className='section-text__body'>
                Timestamp matches. Filter by wrestler, setups, round and much
                more.
              </Grid>
            </Grid>
          </Grid>

          <Grid className='service-card active'>
            <Grid className='service-card__text-container'>
              <Link to='/stats'>
                <Grid className='p-2' style={{ height: "10", width: "200" }}>
                  <img src={bargraph} alt='profiles' width='70%' height='50%' />
                </Grid>{" "}
              </Link>
              <Grid className='section-text__title-small'>Statistics </Grid>
              <Grid className='section-text__body'>
                Get top stats, by wrestler, team and takedown.
              </Grid>
            </Grid>
          </Grid>

          <Grid className='service-card'>
            <Link to='/wrestler'>
              <Grid className='p-2' style={{ height: "10", width: "200" }}>
                <img src={wrestle} alt='profiles' width='70%' height='50%' />
              </Grid>{" "}
            </Link>
            <Grid className='service-card__text-container'>
              <Grid className='section-text__title-small'>
                Wrestler Profiles
              </Grid>
              <Grid className='section-text__body'>INFO</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Services;
