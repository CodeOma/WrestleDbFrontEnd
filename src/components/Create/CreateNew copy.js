import React, { useState, useRef, useEffect } from "react";
import { Grid, Button, FormHelperText } from "@material-ui/core";
import Select from "./Selector";
// import { useGlobalContext } from "../../context/context";
import Video from "../Editor/Video";
import Modal from "./CreateModal";
import axios from "axios";
// import {
//   getMatch,
//   updateMatch,
//   getMatchByWrestler,
// } from "../../controllers/controller";
import { userUpdateMatch } from "../../controllers/manage/create";
import uniqid from "uniqid";
import SaveIcon from "@material-ui/icons/Save";
import AutocompleteCheckbox from "../Editor/AutocompleteCheckbox";
import { getWrestlerById } from "../../controllers/controller";
import { userFetchTakedown } from "../../controllers/manage/takedown";

import { userFetchType } from "../../controllers/manage/type";
import { userFetchPosition } from "../../controllers/manage/position";
import { userFetchCategory } from "../../controllers/manage/category";
import { userFetchTag } from "../../controllers/manage/tag";

const Editor = () => {
  // const { addScore, videoTime: globalTime, match } = useGlobalContext();

  const [videoTime, setVideoTime] = useState(0);
  const [filteredTakedowns, setFilteredTakedowns] = useState([]);
  const [wrestlerId, setWrestlerId] = useState("6042f3208e4ff31a532f7324");
  const [currentWrestler, setCurrentWrestler] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [editingRender, setEditingRender] = useState(false);
  const [matchIndex, setMatchIndex] = useState(0);
  const [matchList, setMatchList] = useState([]);
  const [tags, setTags] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [takedownOptions, setTakedownOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [wrestler, setWrestler] = useState({
    red: "",
    redId: "",
    blue: "",
    blueId: "",
  });

  const [timestamp, setTimestamp] = useState({
    takedown: {
      id: uniqid.process(),
      round: "",
      wrestlerId: "",
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

  const [scoreRed, setScoreRed] = useState({
    name: "",
    id: "",
    color: "red",
  });
  const [scoreBlue, setScoreBlue] = useState({
    name: "",
    id: "",
    color: "blue",
  });

  useEffect(() => {
    console.log("CHECKED");
    const fetchWrest = async () => {
      try {
        if (wrestler.redId) {
          const redData = await getWrestlerById(wrestler.redId);
          setFinalMatch({
            ...finalMatch,
            redWrestler: {
              id: redData.data[0]._id,

              team: redData.data[0].team,
            },
          });
          setScoreRed({
            ...scoreRed,
            name: redData.data[0].fullName,
            id: redData.data[0]._id,
          });
        }
        if (wrestler.blueId) {
          const blueData = await getWrestlerById(wrestler.blueId);
          setFinalMatch({
            ...finalMatch,
            blueWrestler: {
              id: blueData.data[0]._id,
              // fullName: blueData.data[0].fullName,
              // lastName: blueData.data[0].lastName,
              team: blueData.data[0].team,
            },
          });
          setScoreBlue({
            ...scoreBlue,
            name: blueData.data[0].fullName,
            id: blueData.data[0]._id,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWrest();
  }, [wrestler]);

  const [finalMatch, setFinalMatch] = useState({
    tournament: "",
    style: "",
    weightClass: "",
    round: "",
    result: {
      victoryType: "",
      winner: "",
      loser: "",
      winnerPoints: "",
      loserPoints: "",
      redTotalPoints: 0,
      blueTotalPoints: "",
    },
    redWrestler: {
      id: "",

      team: "",
    },
    blueWrestler: {
      id: "",

      team: "",
    },

    url: {},

    scores: [],
  });

  const styles = {
    root: {
      padding: "60px",
      paddingTop: "30px",
      backgroundColor: "white",
    },
    list: {
      backgroundColor: "#f7f9fa",
      maxHeight: "125px",
      maxWidth: "100%",
      overflow: "scroll",
    },
    input: {
      borderTopStyle: "hidden",
      borderRightStyle: "hidden",
      borderLeftStyle: "hidden",
      width: "50px",
    },
  };
  useEffect(() => {
    const takedownfilt = takedownOptions.filter(td => {
      return (
        td.type === timestamp.type &&
        td.position === timestamp.position &&
        td.offdef === timestamp.offdef
      );
    });
  }, [timestamp]);
  useEffect(() => {
    const fetchTags = async () => {
      const fetchedTags = await userFetchTag();
      console.log(fetchedTags.data);
      const newArray = fetchedTags.data.map(type => {
        return { title: type.type, id: type._id };
      });
      setTagOptions(newArray);
    };
    fetchTags();
    const fetchType = async () => {
      const fetchedType = await userFetchType();
      console.log(fetchedType.data);
      const newArray = fetchedType.data.map(type => {
        return { title: type.type, id: type._id };
      });
      setTypeOptions(newArray);
    };
    fetchType();
    const fetchPosition = async () => {
      const fetchedPosition = await userFetchPosition();
      console.log(fetchedPosition.data);
      const newArray = fetchedPosition.data.map(position => {
        return { title: position.position, id: position._id };
      });
      setPositionOptions(newArray);
    };
    fetchPosition();
    const fetchCategory = async () => {
      const fetchedCategory = await userFetchCategory();
      console.log(fetchedCategory.data);
      const newArray = fetchedCategory.data.map(category => {
        return { title: category.category, id: category._id };
      });
      setCategoryOptions(newArray);
    };
    fetchCategory();
    const fetchTakedown = async () => {
      const fetchedTakedown = await userFetchTakedown();
      console.log(fetchedTakedown.data);
      const newArray = fetchedTakedown.data.map(td => {
        return { title: td.category, id: td._id };
      });
      setTakedownOptions(newArray);
    };
    fetchTakedown();
  }, []);
  const onSelectorChange = e => {
    if (e.target.name === "wrestler") {
      console.log("YOOOOOO");

      if (e.target.value === scoreRed.name) {
        setCurrentWrestler(scoreRed);
        console.log("YOOOOOO");
      } else if (e.target.value === scoreBlue.name) {
        setCurrentWrestler(scoreBlue);
      }
    }
    if (e.target.name === "setup") {
      setTags([...tags, e.target.value]);
    }

    setTimestamp({
      takedown: {
        ...timestamp.takedown,
        [e.target.name]: e.target.value,
      },
    });
    if (e.target.name === "points") {
      setTimestamp({
        takedown: {
          ...timestamp.takedown,
          points: parseInt(e.target.value),
        },
      });
    }
  };

  const handleDetails = e => {
    setTimestamp({
      takedown: {
        ...timestamp.takedown,
        [e.target.name]: e.target.value,
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
  };
  useEffect(() => {
    console.log(currentWrestler);
    console.log("THISSSSSSS");
    setTimestamp({
      takedown: {
        ...timestamp.takedown,
        wrestlerId: currentWrestler.id,
      },
    });
    console.log(currentWrestler);
  }, [currentWrestler]);
  const handleSubmit = e => {
    e.preventDefault();
    try {
      let fixed = timestamp.takedown;
      timestamp.takedown.setup = tags;
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

      const setTotals = () => {
        const totalRed = finalMatch.scores
          .filter(takedown => takedown.wrestlerId === finalMatch.redWrestler.id)
          .reduce((a, score) => parseInt(score.points) + a, 0);
        const totalBlue = finalMatch.scores
          .filter(
            takedown => takedown.wrestlerId === finalMatch.blueWrestler.id
          )
          .reduce((a, score) => parseInt(score.points) + a, 0);
        console.log("total", totalRed, totalBlue);

        setFinalMatch({
          ...finalMatch,
          result: { ...finalMatch.result, redTotalPoints: totalRed },
        });
        setTotals();
        setFinalMatch({
          ...finalMatch,
          result: { ...finalMatch.result, blueTotalPoints: totalBlue },
        });
      };
      const sorted = [...finalMatch.scores, fixed].sort(
        (a, b) => a.time - b.time
      );
      setFinalMatch({
        ...finalMatch,
        scores: sorted,
      });
      setTags([]);
      setTimestamp({
        takedown: {
          id: uniqid.process(),
          round: "",
          wrestlerId: currentWrestler.id,
          // color: currentWrestler.color,
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
  useEffect(() => {}, [scoreRed, scoreBlue]);

  const deleteTimestamp = id => {
    const filtered = finalMatch.scores.filter(t => t.id !== id);
    setFinalMatch({
      ...finalMatch,
      scores: filtered,
    });
  };
  const filtered = id => {
    try {
      // console.log(finalMatch.scores[0]);
      // const y =
      //   finalMatch.scores[0] && finalMatch.scores[1]
      //     ? [
      //         ...finalMatch.scores[0].totalScores,
      //         ...finalMatch.scores[1].totalScores,
      //       ]
      //     : finalMatch.scores[0]
      //     ? [...finalMatch.scores[0].totalScores]
      //     : [...finalMatch.scores[1].totalScores];
      const [x] = finalMatch.scores.filter(t => t.id === id);
      // const [selectedScore] = x;
      return x;
    } catch (e) {
      console.log(e);
    }
  };
  const handleTimestamp = id => {
    try {
      const selected = filtered(id);
      console.log(selected);
      // setTimestamp({
      //   takedown: { ...timestamp.takedown, ...selected },
      // });
      setTimestamp({ takedown: selected });
      // if(selected.takedown.)
      setCurrentWrestler(
        selected.wrestlerId === scoreRed.id ? scoreRed : scoreBlue
      );
      setEditingRender(!editingRender);
      setIsEdit(true);
      setTags(timestamp.takedown.setup);
    } catch (error) {
      console.log(error);
    }
  };
  const removeTag = tag => {
    console.log("clicked");
    setTags(tags.filter(t => t !== tag));
    console.log(tag, tags);
  };

  useEffect(() => {
    // handleTimestamp();
  }, [editingRender]);
  return (
    <Grid Card className='m-2 mx-5' style={styles.root}>
      {/*
      {matchList.length !== 0 && (
        <p>
          {matchIndex + 1}/{matchList.length}
        </p>
      )} */}
      <Grid
        direction='row'
        xs={12}
        className='pt-4'
        justify='flex-end'
        container
      >
        <Button
          onClick={() => {
            //updateMatch(finalMatch)
            console.log(finalMatch);
          }}
        >
          <SaveIcon />{" "}
        </Button>

        <Modal
          wrestler={wrestler}
          setWrestler={setWrestler}
          setMatchInfo={setFinalMatch}
          matchInfo={finalMatch}
          isOpenDef={true}
        />
      </Grid>
      <Grid contianer>
        <Video
          setMatchEdit={handleTimestamp}
          getTime={getTime}
          setVideoTime={setVideoTime}
          videoTime={videoTime}
          deleteTimestamp={deleteTimestamp}
          match={finalMatch}
          render={timestamp}
        />
      </Grid>
      <hr
        style={{
          backgroundColor: "black",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <Grid container justify='center' alignItems='center' xs={12}>
        <Grid container justify='space-evenly' direction='row'>
          <Grid
            justify='space-evenly'
            className='px-1'
            container
            alignItems='flex-start'
            driection='row'
            xs={7}
          >
            <Grid
              container
              // justify='space-evenly'
              // alignItems='flex-start'
              className='px-2'
              item
              // direction='column'
            >
              <div style={{ maxWidth: 200 }}>
                {/* <Select
                  state={timestamp.takedown}
                  fn={setTimestamp}
                  name={"wrestler"}
                  onChange={onSelectorChange}
                  options={[wrestler.red, wrestler.blue]}
                  label={"Wrestler"}
                /> */}
              </div>
              {/* <Select
                state={timestamp.takedown}
                fn={setTimestamp}
                name={"offdef"}
                onChange={onSelectorChange}
                options={[
                  { id: 1, title: "Offensive" },
                  { id: 1, title: "Defensive" },
                  { id: 1, title: "Other" },
                ]}
                label={"Offensive/Defensive "}
              /> */}
              {/* <Select
                state={timestamp.takedown}
                fn={setTimestamp}
                name={"position"}
                disabled={timestamp.takedown.offdef === "Other" ? true : false}
                onChange={onSelectorChange}
                options={positionOptions}
                label={"Position"}
              /> */}

              <Grid
                className='p-2'
                driection='row'
                alignItems='center'
                container
                spacing={2}
              >
                {/* <Select
                  state={timestamp.takedown}
                  fn={setTimestamp}
                  name={"points"}
                  onChange={onSelectorChange}
                  options={[1, 2, 4, 5]}
                  label={"points"}
                /> */}
                <div>
                  <input
                    value={timestamp.takedown.time}
                    style={styles.input}
                    name={"time"}
                    placeholder='time'
                    onChange={e => handleDetails(e)}
                  />
                  <FormHelperText>time</FormHelperText>
                </div>

                {/* <input
                  name={"details"}
                  placeholder='any details'
                  onChange={e => handleDetails(e)}
                ></input> */}
              </Grid>
            </Grid>
          </Grid>
          <Button
            onClick={() => console.log(currentWrestler, finalMatch, timestamp)}
          >
            Press
          </Button>
          <Grid
            container
            alignItems='flex-start'
            direction='row'
            // justify='center'
            justify='space-evenly'
            //  alignItems='center'
            xs={5}
          >
            <Grid xs={12} md={6}>
              {/* <AutocompleteCheckbox
                options={tagOptions}
                setFunction={setTags}
                value={tags}
              /> */}
            </Grid>

            <Grid xs={12} md={6} container direction='column'>
              {timestamp.takedown.offdef === "Offensive" &&
                {
                  /* <Select
                  state={timestamp.takedown}
                  fn={setTimestamp}
                  name={"type"}
                  onChange={onSelectorChange}
                  options={typeOptions}
                  label={"type"}
                /> */
                }}

              {timestamp.takedown.position === "Standing" &&
                {
                  /* <Select
                  state={timestamp.takedown}
                  fn={setTimestamp}
                  name={"takedown"}
                  onChange={onSelectorChange}
                  options={filteredTakedowns}
                  label={"Scoring"}
                /> */
                }}
              {timestamp.takedown.offdef === "Offensive" &&
                {
                  /* <Select
                  state={timestamp.takedown}
                  fn={setTimestamp}
                  name={"takedown"}
                  onChange={onSelectorChange}
                  options={[
                    "Cross Ankles",
                    "Gut Wrench",
                    "High gutwrench",
                    "Low gutwrench",
                    "Ground Other",
                    "Takedown Turn",
                  ]}
                  label={"Scoring"}
                /> */
                }}

              {/* <Select
                state={timestamp.takedown}
                fn={setTimestamp}
                name={"takedown"}
                onChange={onSelectorChange}
                options={
                  timestamp.takedown.offdef === "Other"
                    ? ["Caution", "Passivity(Shot-Clock)", "Denied Challenge"]
                    : [
                        "Go behind",
                        "Chestwrap",
                        "Tilts",
                        "Far Ankle",
                        "Front Headlock",
                        "Counter",
                        "Scramble",
                        "Step Over",
                      ]
                }
                label={"Scoring"}
              /> */}
              {timestamp.takedown.offdef !== "Other" &&
                {
                  /* <Select
                  state={timestamp.takedown}
                  fn={setTimestamp}
                  name={"oppDefendedShot"}
                  onChange={onSelectorChange}
                  options={[
                    "Push-out",
                    "Underhook-Throwby",
                    "Go behind",
                    "Front Headlock",
                    "Slide-by",

                    "Single Leg",
                    "Double Leg",
                    "High-Crotch",
                    "Outside-Step High-Crotch",
                    "Ankle-pick",
                    "Scramble",
                    "Low-Single",
                    "Counter",
                    "Head-outside Low-Single",

                    "Inside-Trip",
                    "Fireman's",
                    "Outside Fireman's",
                    "Shoulder-Throw",
                    "Headlock",
                    "OverUnder",
                    "Front-headlock",
                    "Step Over",
                    "Other Throw",
                  ]}
                  label={"Countered takedown"}
                /> */
                }}
            </Grid>
            <Button type='submit' onClick={handleSubmit}>
              Submit
            </Button>
            {isEdit && (
              <Button
                onClick={() => {
                  setIsEdit(false);
                  setTags([]);
                }}
              >
                Cancel Edit
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Editor;
