import React from "react";
import { Link, Grid, Button } from "@material-ui/core";
const Notfound = () => {
  return (
    <Grid container className='p-4'>
      <h1>404 - Not Found!</h1>
      <Button>
        <Link href='/'>Go Home</Link>
      </Button>
    </Grid>
  );
};

export default Notfound;
