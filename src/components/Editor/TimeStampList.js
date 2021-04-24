import React, { useState, useEffect } from "react";
////EDITOR//// List

import { Grid, Button, Card } from "@material-ui/core";
import Timestamp from "./Timestamp";
import { useGlobalContext } from "../../context/context";

const TimestampList = ({ setTime, match, setMatchEdit, render }) => {
  const [timestamps, setTimestamps] = useState([]);
  useEffect(() => {
    const setInit = () => {
      try {
        console.log(match);
        const mo = match.scores.map(wrestler => {
          console.log(wrestler);
          if (wrestler.totalScores) {
            return wrestler.totalScores;
          }
        });
        const m = mo;
        console.log(m);
        if (m[0] && m[1]) {
          setTimestamps(
            [...m[0], ...m[1]].sort((a, b) => {
              return a.time - b.time;
            })
          );
        }

        if (m[0] && !m[1]) {
          setTimestamps(
            m[0].sort((a, b) => {
              return a.time - b.time;
            })
          );
        }

        if (m[1] && !m[0]) {
          setTimestamps(
            m[1].sort((a, b) => {
              return a.time - b.time;
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (match) {
      setInit();
    }
    console.log(match);
  }, [match, render]);

  return (
    <Grid
      component={Card}
      style={{ width: "100%", maxHeight: "360px", overflow: "scroll" }}
    >
      {timestamps.length > 0
        ? timestamps.map(timestamp => {
            console.log(timestamp);
            const min = Math.floor(timestamp.time / 60);
            const sec = timestamp.time - min * 60;
            const times = `${min}m ${sec}sec`;
            return (
              <Timestamp
                render={render}
                setMatchEdit={setMatchEdit}
                setTime={setTime}
                id={timestamp.id}
                time={times}
                vidTime={timestamp.videoTime}
                round={timestamp.round}
                // scoring={timestamp.scoringInfo.takedown.scoring}
                wrestler={timestamp.name}
                // opponent={timestamp.wrestlerInfo.opponent}
                takedown={timestamp.takedown}
                setup={timestamp.setup}
                pointsScored={timestamp.points}
                // details={timestamp.scoringInfo.takedown.details}
                color={
                  timestamp.name === match.redWrestler.fullName ? "red" : "blue"
                }
                // colorOpp={timestamp.wrestlerInfo.opponentColor}
                // match={timestamp.match || ""}
                offdef={timestamp.offdef}
              />
            );
          })
        : "Empty"}
      <Grid container direction='row'></Grid>
    </Grid>
  );
};

export default TimestampList;
