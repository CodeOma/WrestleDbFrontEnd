import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
const Notfound = () => {
  return (
    <Grid container className='p-4'>
      <h1>404 - Not Found!</h1>
      <Button>
        <Link to='/'>Go Home</Link>
      </Button>
    </Grid>
  );
};

export default Notfound;
