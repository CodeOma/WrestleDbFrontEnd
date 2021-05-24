import React, { useState, useEffect } from "react";
import { Grid, Button, Card } from "@material-ui/core";
import { useGlobalContext } from "../../context/context";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { userFetchTakedownById } from "../../controllers/manage/takedown";
import { userFetchTagById } from "../../controllers/manage/tag";

const Timestamp = ({
  vidTime,
  render,
  setMatchEdit,
  time,
  wrestler,
  tagIds,
  takedownId,
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
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [takedown, setTakedown] = useState("");
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
    console.log("rerender");
  }, [render, match]);
  useEffect(() => {
    setIsLoading(true);
    const getTakedown = async () => {
      try {
        const data = await userFetchTakedownById(takedownId);
        const takedownFetched = data.data[0].takedown;
        setTakedown(takedownFetched);
      } catch (e) {
        console.log(e);
      }
    };
    getTakedown();

    const getTags = async () => {
      try {
        // should try to implement this better
        const tagList = await Promise.all(
          tagIds.map(async t => {
            const data = await userFetchTagById(t.id);
            console.log("Data", data);
            return data.data[0].tag;
          })
        );
        console.log(tagList);
        setTags(tagList);
      } catch (e) {
        console.log(e);
      }
    };
    getTags();
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
            {isLoading ? (
              <p> Loading</p>
            ) : (
              <Grid
              // container
              // // justify='space-around'
              // alignItems='start'
              // direction='row'
              >
                {offdef == 1 ? (
                  <>
                    <p style={styles.p}>Takedown: {takedown}</p>
                    {tags.length > 0 && (
                      <p style={styles.p}>
                        Setup:
                        {tags.length > 0 &&
                          tags.map((s, i) => (i === 0 ? `${s}` : `, ${s}`))}
                      </p>
                    )}
                  </>
                ) : offdef == 2 ? (
                  <>
                    {" "}
                    <p style={styles.p}>Defense: {takedown}</p>
                  </>
                ) : offdef == 3 ? (
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
            )}
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
