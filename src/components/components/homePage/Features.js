import React from "react";
import "../../../assets/styles.css";
import { Grid } from "@material-ui/core";
function Features() {
  return (
    <Grid container className='p-4 features' direction='row'>
      <Grid container xs={6} className='p-4'>
        SOME PICTURE
      </Grid>
      <Grid container xs={6} className='p-4'>
        <Grid className='section-text'>
          <Grid className='section-text__title'>Features dnaskdlasdma</Grid>

          <Grid className='row'>
            <Grid className='feature-box col-50'>
              <Grid className='section-text__title-small'>
                Breakdown Matches
              </Grid>
              <Grid className='section-text__body'>
                {/* Timestamp matches by scoring. Gather data on setups....{" "} */}
                Some info
              </Grid>
            </Grid>

            <Grid className='feature-box col-50'>
              <Grid className='section-text__title-small'>Statistics</Grid>
              <Grid className='section-text__body'>
                Some info on stats
                {/* Get Statistics from the top wrestlers. Get stats on your team or
                athletes{" "} */}
              </Grid>
            </Grid>
          </Grid>

          <Grid className='row'>
            <Grid className='feature-box col-50'>
              <Grid className='section-text__title-small'>Something cool</Grid>
              <Grid className='section-text__body'>
                Aorem psum olorsit amet ectetur adipiscing elit, sed dov.
              </Grid>
            </Grid>

            <Grid className='feature-box col-50'>
              <Grid className='section-text__title-small'>Something Cool</Grid>
              <Grid className='section-text__body'>
                Aorem psum olorsit amet ectetur adipiscing elit, sed dov.
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Features;
