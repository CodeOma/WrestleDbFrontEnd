import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
const Developing = () => {
  return (
    <Grid container className='p-4'>
      <h1>Not available</h1>
      <Button>
        <Link to='/'>Go Home</Link>
      </Button>
    </Grid>
  );
};

export default Developing;
