import React, { useState, useEffect } from "react";
import { Grid, Button, Card } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const Timestamp = ({
  vidTime,
  render,
  setMatchEdit,
  time,
  wrestler,
  setup,
  takedown,
  pointsScored,
  details,
  color,
  videoTime,
  setTime,
  match,
  offdef,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const styles = {
    root: {
      width: "95%",
      fontFamily: "Lato",
    },
    p: {
      fontSize: "12",
      margin: 0,
      padding: 0,
    },
    button: {
      padding: 0,
      margin: 0,
    },
  };
  useEffect(() => {}, [render]);
  return (
    <Grid component={Card} style={{ backgroundColor: "white", ...styles.root }}>
      <hr
        style={{
          backgroundColor: color,
          height: "15px",
          padding: 0,
          margin: 0,
        }}
      />
      <Grid className='p-2'>
        <h5>
          {wrestler} - {pointsScored}
        </h5>
        <hr
          style={{
            padding: 0,
            margin: 0,
          }}
        />
        <Grid direction='column' className='px-2' container>
          <Grid direction='row'>
            <Grid justify='space-around' alignItems='start' direction='row'>
              {offdef === "Offensive" ? (
                <>
                  <p style={styles.p}>Takedown: {takedown}</p>
                  {setup.length > 0 && (
                    <p style={styles.p}>
                      Setup:
                      {setup.length > 0 &&
                        setup.map((s, i) => (i === 0 ? `${s}` : `, ${s}`))}
                    </p>
                  )}
                </>
              ) : offdef === "Defensive" ? (
                <>
                  {" "}
                  <p style={styles.p}>Defense: {takedown}</p>
                </>
              ) : offdef === "Other" ? (
                <>
                  {" "}
                  <p style={styles.p}>Other: {takedown}</p>
                </>
              ) : (
                <>
                  <p style={styles.p}>Info Missing</p>
                </>
              )}

              <Button onClick={() => setTime(Math.floor(vidTime))}>
                Time: {time}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Timestamp;
