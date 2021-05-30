import { Card, Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Grid container xs={12} direction='row'>
      <h1>Home Page</h1>
      <Grid container direction='row' xs={12}>
        <Grid container xs={4} justify='center'>
          {" "}
          <Link to='/techniques' className='w-100'>
            <Card className='w-100 h-100 p-4 m-2'>
              <Grid className='w-100' container direction='column'>
                <h4>Technique Database</h4>
              </Grid>
            </Card>
          </Link>
        </Grid>

        <Grid container xs={4} justify='center'>
          {" "}
          <Link to='/database' className='w-100'>
            <Card className='w-100 h-100 p-4 m-2'>
              <Grid className='w-100' container direction='column'>
                <h4>Matches</h4>
              </Grid>
            </Card>{" "}
          </Link>
        </Grid>

        <Grid container xs={4} justify='center'>
          {" "}
          <Link to='/database' className='w-100'>
            <Card className='w-100 h-100 p-4 m-2'>
              <Grid className='w-100' container direction='column'>
                <h4>Wrestlers</h4>
              </Grid>
            </Card>{" "}
          </Link>
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
