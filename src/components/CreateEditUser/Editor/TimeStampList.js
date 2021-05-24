import React, { useState, useEffect } from "react";
////EDITOR//// List

import { Grid, Button, Card } from "@material-ui/core";
import Timestamp from "./Timestamp";
import { getWrestlerById } from "../../controllers/controller";

const TimestampList = ({
  setTime,
  match,
  setMatchEdit,
  render,
  deleteTimestamp,
  takedowns,
  tags,
}) => {
  const [timestamps, setTimestamps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [takedownDict, setTakedownDict] = useState({});
  const [wrestlers, setWrestlers] = useState({
    redWrestler: {
      name: "",
      id: "",
    },
    blueWrestler: {
      name: "",
      id: "",
    },
  });
  const setInit = () => {
    try {
      setTimestamps(match.scores);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("FETCHED");
    const fetch = async () => {
      try {
        // if (match.redWrestler.id) {
        const redData = await getWrestlerById(match.redWrestler.id);

        // setWrestlers({
        //   ...wrestle rs,
        // });
        console.log(redData);
        console.log("wret", wrestlers);
        // }
        // if (match.blueWrestler.id) {
        const blueData = await getWrestlerById(match.blueWrestler.id);

        setWrestlers({
          redWrestler: {
            ...wrestlers.redWrestler,
            name: redData.data[0].fullName,
            id: redData.data[0]._id,
          },
          blueWrestler: {
            ...wrestlers.blueWrestler,
            name: blueData.data[0].fullName,
            id: blueData.data[0]._id,
          },
        });

        // }
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
    console.log(wrestlers);
  }, [match]);
  useEffect(() => {
    setIsLoading(true);
    if (match) {
      setInit();
    }
    setIsLoading(false);
  }, [match, render]);

  return (
    <Grid
      component={Card}
      style={{ width: "100%", maxHeight: "360px", overflow: "scroll" }}
    >
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          {timestamps.length > 0
            ? timestamps.map(timestamp => {
                const min = Math.floor(timestamp.time / 60);
                const sec = timestamp.time - min * 60;
                const times = `${min}m ${sec}sec`;
                console.log(timestamp);

                return (
                  <Timestamp
                    render={render}
                    setMatchEdit={setMatchEdit}
                    deleteTimestamp={deleteTimestamp}
                    setTime={setTime}
                    id={timestamp.id}
                    time={times}
                    vidTime={timestamp.videoTime}
                    round={timestamp.round}
                    // scoring={timestamp.scoringInfo.takedown.scoring}
                    // wrestler={
                    //   timestamp.wrestlerId === match.redWrestler.id
                    //     ? wrestlers.redWrestler.name
                    //     : wrestlers.blueWrestler.name
                    // }
                    wrestler={
                      timestamp.name === wrestlers.redWrestler.name
                        ? wrestlers.redWrestler.name
                        : wrestlers.blueWrestler.name
                    }
                    //                     function getKeyByValue(object, value) {
                    //   return Object.keys(object).find(key => object[key] === value);
                    // }
                    // opponent={timestamp.wrestlerInfo.opponent}
                    takedownId={timestamp.takedown}
                    tagIds={timestamp.tags}
                    pointsScored={timestamp.points}
                    // details={timestamp.scoringInfo.takedown.details}
                    color={
                      timestamp.name === wrestlers.redWrestler.name
                        ? "red"
                        : "blue"
                    }
                    // colorOpp={timestamp.wrestlerInfo.opponentColor}
                    // match={timestamp.match || ""}
                    offdef={timestamp.offdef}
                  />
                );
              })
            : "Empty"}{" "}
        </>
      )}
      <Grid container direction='row'></Grid>
    </Grid>
  );
};

export default TimestampList;
