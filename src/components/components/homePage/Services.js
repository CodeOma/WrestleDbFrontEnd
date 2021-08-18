import React from "react";
import "../../../assets/styles.css";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
function Services() {
  return (
    <Grid container className='p-4' direction='row' justify='center' style={{background:'#f7fcfc'}}>
      <Grid className='section-text'>
        <Grid className='section-text__title-centered'>
          Check out! more words here?{" "}
        </Grid>
        <Grid className='service-cards'>
          <Grid className='service-card'>
            <Link to='/techniques'>
              <img src='../../assets/images/SUMO.jpeg' alt='technique' />
            </Link>
            <Grid className='service-card__text-container'>
              <Grid className='section-text__title-small'>Database</Grid>
              <Grid className='section-text__body'>
                Timestamp matches. Filter by wrestler, setups, etc... add more
                wordds herreeee add more wordds herreeee add more wordds
                herreeee
              </Grid>
            </Grid>
          </Grid>

          <Grid className='service-card active'>
            <Grid className='service-card__text-container'>
              <Link to='/techniques'>
                <img src='../../assets/images/SUMO.jpeg' alt='stats' />
              </Link>
              <Grid className='section-text__title-small'>Statistics </Grid>
              <Grid className='section-text__body'>
                Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod
                tempor incididunt ut laborea.
              </Grid>
            </Grid>
          </Grid>

          <Grid className='service-card'>
            <Link to='/techniques'>
              <img src='../../assets/images/SUMO.jpeg' alt='profiles' />
            </Link>
            <Grid className='service-card__text-container'>
              <Grid className='section-text__title-small'>
                Wrestler Profiles
              </Grid>
              <Grid className='section-text__body'>
                Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod
                tempor incididunt ut laborea.
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Services;
