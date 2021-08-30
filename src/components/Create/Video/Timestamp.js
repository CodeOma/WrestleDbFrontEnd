import React, { useState, useEffect } from "react";
import { Grid, Button, Card } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { userFetchTakedownById } from "../../../controllers/manage/takedown";
import { userFetchTagById } from "../../../controllers/manage/tag";

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
  deleteTimestamp,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, [render, match]);

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
          <Grid container direction='row'>
            <Grid
            // container
            // // justify='space-around'
            // alignItems='start'
            // direction='row'
            >
              {offdef ? (
                <>
                  <p style={styles.p}>
                    {offdef}: {takedown}
                  </p>
                  {setup.length > 0 && (
                    <p style={styles.p}>
                      Setup:
                      {setup.length > 0 &&
                        setup.map((s, i) => (i === 0 ? `${s}` : `, ${s}`))}
                    </p>
                  )}
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
          {/* {isOpen ? (
            <ExpandLessIcon
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          ) : (
            <ExpandMoreIcon
              onClick={() => {
                setIsOpen(!isOpen);
                console.log(color);
              }}
            />
          )} */}
        </Grid>{" "}
        <Grid container justify='flex-end'>
          <p>{details}</p>
          <Button style={styles.button} onClick={() => setMatchEdit(id)}>
            <EditIcon />
          </Button>
          <Button style={styles.button} onClick={() => deleteTimestamp(id)}>
            <DeleteIcon />
          </Button>
        </Grid>{" "}
      </Grid>
    </Grid>
  );
};

export default Timestamp;
