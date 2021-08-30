import React, { useState, useRef, useEffect } from "react";
import { Grid, Button, FormHelperText, Card } from "@material-ui/core";
import Video from "./Video";
import axios from "axios";
import {
  getMatch,
  updateMatch,
  getMatchByWrestler,
  getMatchByWrestlerId,
} from "../../controllers/controller";
import { youtubeVideoId } from "../../helpers/formatting";
import AutoComplete from "./AutoCompleteInput";
import AutocompleteCheckbox from "./AutocompleteCheckbox";
import { useParams } from "react-router-dom";
const Editor = () => {
  const { match_id } = useParams();

  const [videoTime, setVideoTime] = useState(0);
  const [wrestlerId, setWrestlerId] = useState("6042f3208e4ff31a532f7324");

  const [matchIndex, setMatchIndex] = useState(0);
  const [matchData, setMatchData] = useState({});
  const [matchList, setMatchList] = useState([]);
  const [tags, setTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [wrestler, setWrestler] = useState("");
  const [currentWrestler, setCurrentWrestler] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [timestamp, setTimestamp] = useState({
    takedown: {
      id: "",
      round: "",
      name: "",
      takedown: "",
      offdef: "Offensive",
      position: "Standing",
      oppDefendedShot: "",
      type: "",
      setup: [],
      details: "",
      videoTime: 0,
      time: 0,
      points: 0,
    },
  });

  const styles = {
    root: {
      padding: "10%",
      paddingTop: "5%",
      backgroundColor: "white",
      // backgroundColor: "lightBlue",
      // backgroundColor: "grey",
    },
    list: {
      backgroundColor: "#f7f9fa",
      maxHeight: "175px",
      overflow: "scroll",
    },
    input: {
      borderTopStyle: "hidden",
      borderRightStyle: "hidden",
      borderLeftStyle: "hidden",
      width: "50px",
    },
  };
  const onSelectorChange = e => {
    if (e.target.name === "setup") {
      if (e.target.name !== null) {
        const tag = new Set();
        tags.forEach(t => tag.add(t));
        tag.add(e.target.value);

        setTags([...tag]);
      }
    }

    setTimestamp({
      takedown: {
        ...timestamp.takedown,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleDetails = e => {
    setTimestamp({
      takedown: {
        ...timestamp.takedown,
        details: e.target.value,
      },
    });
  };

  const getTime = time => {
    setTimestamp({
      takedown: {
        ...timestamp.takedown,
        videoTime: time,
      },
    });
    console.log(timestamp);
  };

  const handleSubmit = e => {
    e.preventDefault();
    try {
      const [wrestler, scoresArr, index] = tempname();
      let fixed = timestamp.takedown;
      // setupstags.filter(i => i ? true : false)
      // fixed = {...fixed, setup:[ tags.filter();
      if (
        timestamp.takedown.offdef === "Defensive" ||
        timestamp.takedown.offdef === "Other"
      ) {
        fixed = { ...fixed, setup: [], type: "" };
      }
      if (timestamp.takedown.position === "Ground") {
        fixed = { ...fixed, setup: [], type: "Ground" };
      }
      if (
        timestamp.takedown.offdef === "Offensive" ||
        timestamp.takedown.offdef === "Other"
      ) {
        fixed["oppDefendedShot"] = "";
      }
      if (timestamp.takedown.offdef === "Other") {
        fixed["position"] = "";
      }

      const newTdArray = [...scoresArr, fixed];
      // console.log(newTdArray);
      // console.log(matchData);
      console.log(index);
      const tempInput = { ...wrestler, totalScores: newTdArray };
      console.log("this is temp input", tempInput);
      console.log(timestamp);
      console.log(matchData);

      setMatchData(
        {
          ...matchData,
          scores: [...matchData.scores],
        },
        (matchData.scores[index] = tempInput)
      );

      setMatchData({ ...matchData });
      console.log(matchData);
      setTags([]);
      setTimestamp({
        takedown: {
          id: "",
          round: "",
          name: "",
          takedown: "",
          offdef: "Offensive",
          position: "Standing",
          oppDefendedShot: "",
          type: "",
          setup: [],
          details: "",
          videoTime: 0,
          time: 0,
          points: 0,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const getData = await getMatch(match_id);
      setMatchData(getData.data);
    };
    fetch();
  }, [match_id]);
  const tempname = () => {
    try {
      // console.log(matchData.scores);
      const [temp] = matchData.scores.filter(wrestler => {
        // console.log(wrestler.totalScores);
        return wrestler.totalScores
          .map(score => {
            if (score.id === timestamp.takedown.id) {
              // console.log(score.time, timestamp.takedown.time);
              return true;
            }
            return false;
          })
          .includes(true);
      });
      // console.log(temp);
      const filteredArr = temp.totalScores.filter(
        score => score.id !== timestamp.takedown.id
      );
      // console.log(filteredArr);
      const index = matchData.scores.indexOf(temp);
      return [temp, filteredArr, index];
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = id => {
    try {
      console.log(id);
      console.log(matchData.scores[0]);
      const y =
        matchData.scores[0] && matchData.scores[1]
          ? [
              ...matchData.scores[0].totalScores,
              ...matchData.scores[1].totalScores,
            ]
          : matchData.scores[0]
          ? [...matchData.scores[0].totalScores]
          : [...matchData.scores[1].totalScores];
      const x = y.filter(t => t.id === id);
      const [selectedScore] = x;
      return selectedScore;
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = async () => {
    try {
      // console.log(wrestlerId);
      const data = await getMatchByWrestlerId(wrestlerId);
      setMatchIndex(0);
      setMatchData(data.data[matchIndex]);
      setMatchList(data.data);
      setIsOpen(true);
    } catch (e) {
      console.log(e);
    }
  };
  const removeTag = tag => {
    setTags(tags.filter(t => t !== tag));
  };
  useEffect(() => {
    // handleTimestamp();
  }, [matchData]);

  return (
    <Grid className='m-2 mx-5' style={styles.root}>
      <Grid container direction='row' alignItems='flex-end'>
        <AutoComplete
          database='wrestler'
          label='wrestler'
          setValu={setWrestlerId}
        />
        {/* <input onChange={e => setWrestlerId(e.target.value)}></input> */}
        <Button onClick={handleClick}>Get matches</Button>
        <Button onClick={() => setMatchIndex(matchIndex - 1)}>
          {" "}
          Prev
        </Button>{" "}
        <Button onClick={() => setMatchIndex(matchIndex + 1)}>
          {" "}
          Next
        </Button>{" "}
        <Button onClick={() => setIsOpen(!isOpen)}>
          {" "}
          {isOpen ? "Close" : "Display Matches"}
        </Button>
      </Grid>
      {isOpen && (
        <>
          <Grid
            container
            direction='row'
            style={{ maxWidth: "100%", overflow: "scroll" }}
          >
            {matchList &&
              matchList.map((match, ind) => {
                return (
                  <Card
                    className='p-2'
                    style={{ width: "25%", height: "330px" }}
                  >
                    <img
                      onClick={() => {
                        setMatchIndex(ind);
                        setMatchData(matchList[matchIndex]);
                        setIsOpen(false);
                      }}
                      style={{ width: "100%" }}
                      src={`https://img.youtube.com/vi/${youtubeVideoId(
                        match.url
                      )}/0.jpg`}
                      alt='img'
                    ></img>
                    <p>
                      {match.result.winner} {match.result.victoryType}{" "}
                      {match.result.loser}{" "}
                      {/* {match.result.winner === match.wrestler.fullName
                        ? match.wrestlerScores?.total || 0
                        : match.opponentScores?.total || 0}
                      -
                      {match.result.loser === match.wrestler.fullName
                        ? match.wrestlerScores?.total ?? 0
                        : match.opponentScores?.total ?? 0} */}
                    </p>
                    <p>
                      {match.tournamentName}: {match.round}
                    </p>
                    <p></p>
                    <p>{match.weightclass}</p>
                  </Card>
                );
              })}
            <h2>whwhhwhwwh </h2>
          </Grid>
          {matchList.length !== 0 && (
            <p>
              {matchIndex + 1}/{matchList.length}
            </p>
          )}
        </>
      )}
      <Grid contianer>
        <Video
          getTime={getTime}
          setVideoTime={setVideoTime}
          videoTime={videoTime}
          match={matchData}
          render={matchIndex}
        />
      </Grid>
      <Grid container justify='center' alignItems='center' xs={12}>
        <Grid container xs={12} direction='row'>
          <Grid
            justify='space-evenly'
            className='px-1'
            container
            alignItems='flex-start'
            driection='row'
            xs={7}
          ></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Editor;
