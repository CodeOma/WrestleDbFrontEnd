import React, { useState, useEffect } from "react";
import { Grid, Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import LeaderBoard from "./LeaderBoard";
const Fantasy = () => {
  return (
    //TO
    //LeaderBoard Total , Gold =10, etc...
    //Past Tournaments
    //Logins

    <Grid
      style={{ background: "#f7fcfc" }}
      container
      className='p-4'
      direction='row'
      xs={12}
    >
      <Grid xs={8} container>
        <Grid container xs={6} className='px-2' direction='column'>
          <Card className='px-2' justify='center'>
            <h6>Previous Results</h6>
            <h6>
              {" "}
              <Link to='/fantasy/makeselections'>Make Selections</Link>
            </h6>
          </Card>
        </Grid>
        <Grid container className='px-2' xs={6}>
          <Card className='px-2'>
            <h6> Current Tournament</h6>
          </Card>
        </Grid>
      </Grid>
      <Grid container xs={4}>
        <LeaderBoard />
      </Grid>
    </Grid>
  );
};

export default Fantasy;
