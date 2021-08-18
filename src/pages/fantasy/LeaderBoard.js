import React, { useState, useEffect } from "react";
import { Grid, Card } from "@material-ui/core";
import { Link } from "react-router-dom";
const LeaderBoard = () => {
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
      <Grid container direction='row' xs={12} justify='center'>
        LeaderBoard
      </Grid>
      <Grid xs={6} container>
        <Card className='px-2 w-100' justify='center'>
          <Grid>
            <h6>Current Results</h6>
            <ul
              style={{
                listStyleType: "none",
                padding: 0,
                margin: 0,
                marginBottom: 20,
              }}
            >
              <li>1. SRandom User</li>
              <li>2. SRandom User</li>
              <li>3. SRandom User</li>
              <li>4. SRandom User</li>
              <li>5. SRandom User</li>
            </ul>

            <h6>Past Results</h6>
            <ul
              style={{
                listStyleType: "none",
                width: "100%",
                padding: 0,
                margin: 0,
                marginBottom: 20,
              }}
            >
              <li>Tournament Names</li>
              <li>Tournament Names</li>
              <li>Tournament Names</li>
              <li>Tournament Names</li>
              <li>Tournament Names</li>
            </ul>
            <h6>
              {" "}
              <Link to='/fantasy/makeselections'>More Results</Link>
            </h6>
          </Grid>
        </Card>
      </Grid>
      <Grid className='px-2 w-100 ' xs={6}>
        <Card className='px-2'>
          <Grid>
            <h6> All Time Leader</h6>
          </Grid>{" "}
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
              marginBottom: 20,
            }}
          >
            <li>1. SRandom User</li>
            <li>2. SRandom User</li>
            <li>3. SRandom User</li>
            <li>4. SRandom User</li>
            <li>5. SRandom User</li>
            <li>6. SRandom User</li>
            <li>7. SRandom User</li>
            <li>8. SRandom User</li>
            <li>9. SRandom User</li>
            <li>10. 12SRandom User</li>
          </ul>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LeaderBoard;

