import React, { useState, useRef, useEffect } from "react";
import { Grid, Button, FormHelperText } from "@material-ui/core";
import Select from "./Selector";
// import { useGlobalContext } from "../../context/context";
import Video from "../Editor/Video";
import Modal from "./CreateModal";
import axios from "axios";
import {
  getMatch,
  updateMatch,
  getMatchByWrestler,
} from "../../controllers/controller";
import uniqid from "uniqid";
import SaveIcon from "@material-ui/icons/Save";
import AutocompleteCheckbox from "../Editor/AutocompleteCheckbox";
import { getWrestlerById } from "../../controllers/controller";
const Editor = () => {
  // const { addScore, videoTime: globalTime, match } = useGlobalContext();

  const [videoTime, setVideoTime] = useState(0);
  const [wrestlerId, setWrestlerId] = useState("6042f3208e4ff31a532f7324");
  const [currentWrestler, setCurrentWrestler] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [editingRender, setEditingRender] = useState(false);
  const [matchIndex, setMatchIndex] = useState(0);
  const [matchList, setMatchList] = useState([]);
  const [tags, setTags] = useState([]);
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

  const [scoreRed, setScoreRed] = useState({
    fullName: "",
    color: "red",
    totalScores: [],
    total: "",
  });
  const [scoreBlue, setScoreBlue] = useState({
    fullName: "",
    color: "blue",
    totalScores: [],
    total: "",
  });

  useEffect(() => {
    console.log("CHECKED");
    const fetch = async () => {
      try {
        if (wrestler.redId) {
          const redData = await getWrestlerById(wrestler.redId);
          console.log(redData);
          setFinalMatch({
            ...finalMatch,
            redWrestler: {
              id: redData.data[0]._id,
              fullName: redData.data[0].fullName,
              lastName: redData.data[0].lastName,
              team: redData.data[0].team,
            },
          });
          setScoreRed({
            ...scoreRed,
            fullName: redData.data[0].fullName,
          });
        }
        if (wrestler.blueId) {
          const blueData = await getWrestlerById(wrestler.blueId);
          setFinalMatch({
            ...finalMatch,
            blueWrestler: {
              id: blueData.data[0]._id,
              fullName: blueData.data[0].fullName,
              lastName: blueData.data[0].lastName,
              team: blueData.data[0].team,
            },
          });
          setScoreBlue({
            ...scoreBlue,
            fullName: blueData.data[0].fullName,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
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
    },
    redWrestler: {
      id: "",
      fullName: "",
      lastName: "",
      team: "",
    },
    blueWrestler: {
      id: "",
      fullName: "",
      lastName: "",
      team: "",
    },

    url: {},

    scores: [],
    // scoreRed.totalScores !== [] && scoreBlue.totalScores !== []
    //   ? [scoreRed, scoreBlue]
    //   : scoreRed.totalScores !== []
    //   ? [scoreRed]
    //   : [scoreBlue],
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
  const onSelectorChange = e => {
    if (e.target.name === "wrestler") {
      setCurrentWrestler(e.target.value);
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
      takedown: { ...timestamp.takedown, name: currentWrestler },
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
      let tdArray = [];
      if (currentWrestler === scoreRed.fullName) {
        console.log("REEEDDDDD");

        tdArray = [...scoreRed.totalScores, fixed];
        const total = tdArray.reduce(
          (a, score) => parseInt(score.points) + a,
          0
        );
        setScoreRed({ ...scoreRed, totalScores: tdArray, total });
      }
      if (currentWrestler === scoreBlue.fullName) {
        console.log("BLUUUUUUU");
        tdArray = [...scoreBlue.totalScores, fixed];
        const total = tdArray.reduce(
          (a, score) => parseInt(score.points) + a,
          0
        );
        setScoreBlue({ ...scoreBlue, totalScores: tdArray, total });
      }
      console.log(scoreRed, scoreBlue);
      if (scoreRed.totalScores.length > 0 && scoreBlue.totalScores.length > 0) {
        setFinalMatch({
          ...finalMatch,
          scores: [scoreRed, scoreBlue],
        });
      } else if (
        scoreRed.totalScores.length > 0 &&
        scoreBlue.totalScores.length === 0
      ) {
        setFinalMatch({
          ...finalMatch,
          scores: [scoreRed],
        });
      } else if (
        scoreRed.totalScores.length === 0 &&
        scoreBlue.totalScores.length > 0
      ) {
        setFinalMatch({
          ...finalMatch,
          scores: [scoreBlue],
        });
      }

      setTags([]);
      setTimestamp({
        takedown: {
          id: "",
          round: "",
          name: currentWrestler,
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

  // const tempname = () => {
  //   try {
  //     // if (isEdit) {
  //     //   const [temp] = finalMatch.scores.filter(wrestler => {
  //     //     console.log(wrestler);
  //     //     return wrestler.totalScores
  //     //       .map(score => {
  //     //         if (score.id === timestamp.takedown.id) {
  //     //           // console.log(score.time, timestamp.takedown.time);
  //     //           return true;
  //     //         }
  //     //         return false;
  //     //       })
  //     //       .includes(true);
  //     //   });
  //     //   console.log(temp);

  //     //   const filteredArr = temp.totalScores.filter(
  //     //     score => score.id !== timestamp.takedown.id
  //     //   );

  //     //   // console.log(filteredArr);
  //     //   // const index = finalMatch.scores.indexOf(temp);
  //     //   return [temp, filteredArr];
  //     // } else {
  //     const [temp] = finalMatch.scores.filter(wrest => {
  //       return wrest.fullName === currentWrestler;
  //       //          return wrest.fullName === timestamp.takedown.name;
  //     });
  //     // console.log(index);
  //     return [temp, temp.totalScores];
  //     // }
  //   } catch (error) {
  //     console.log("No wrestler Selected");
  //     console.log(error);
  //   }
  // };

  const filtered = id => {
    try {
      console.log(id);
      console.log(finalMatch.scores[0]);
      const y =
        finalMatch.scores[0] && finalMatch.scores[1]
          ? [
              ...finalMatch.scores[0].totalScores,
              ...finalMatch.scores[1].totalScores,
            ]
          : finalMatch.scores[0]
          ? [...finalMatch.scores[0].totalScores]
          : [...finalMatch.scores[1].totalScores];
      const x = y.filter(t => t.id === id);
      const [selectedScore] = x;
      return selectedScore;
    } catch (e) {
      console.log(e);
    }
  };
  const handleTimestamp = id => {
    try {
      const selected = filtered(id);
      // console.log(selected);
      setTimestamp({
        takedown: { ...timestamp.takedown, ...selected },
      });
      setCurrentWrestler(selected.takedown.name);
      console.log(timestamp);
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
        />
      </Grid>
      <Grid contianer>
        <Video
          setMatchEdit={handleTimestamp}
          getTime={getTime}
          setVideoTime={setVideoTime}
          videoTime={videoTime}
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
                <Select
                  state={timestamp.takedown}
                  fn={setTimestamp}
                  name={"wrestler"}
                  onChange={onSelectorChange}
                  options={[wrestler.red, wrestler.blue]}
                  label={"Wrestler"}
                />
              </div>
              <Select
                state={timestamp.takedown}
                fn={setTimestamp}
                name={"offdef"}
                onChange={onSelectorChange}
                options={["Offensive", "Defensive", "Other"]}
                label={"Offensive/Defensive "}
              />
              <Select
                state={timestamp.takedown}
                fn={setTimestamp}
                name={"position"}
                disabled={timestamp.takedown.offdef === "Other" ? true : false}
                onChange={onSelectorChange}
                options={["Standing", "Ground"]}
                label={"Position"}
              />

              <Grid
                className='p-2'
                driection='row'
                alignItems='center'
                container
                spacing={2}
              >
                <Select
                  state={timestamp.takedown}
                  fn={setTimestamp}
                  name={"points"}
                  onChange={onSelectorChange}
                  options={[1, 2, 4, 5]}
                  label={"points"}
                />
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
              <AutocompleteCheckbox
                options={[
                  "Arm-Drag",
                  "Clearing ties",
                  "Collar-Tie",
                  "Counter",
                  "Elbow-Tie",
                  "Fake",
                  "From Space",
                  "Front Headlock",
                  "Inside Tie",
                  "Multiple Offensive Attempts",
                  "Outside tie",
                  "Overtie",
                  "Overhook",
                  "Over Under",
                  "Post",
                  "Reach and Go",
                  "Snap",
                  "Shuck",
                  "Slide-by",
                  "Wrists",
                  "Underhook",
                  "2 on 1",
                  "By Zone",
                ]}
                setFunction={setTags}
                value={tags}
              />
            </Grid>
            {/* <Grid xs={6} style={tags ? styles.list : {}}> */}
            {/* <Grid xs={12} className='px-1' style={{}}>
              {timestamp.takedown.offdef === "Offensive" &&
                timestamp.takedown.position === "Standing" && (
                  <Select
                    state={timestamp.takedown}
                    fn={setTimestamp}
                    name={"setup"}
                    onChange={onSelectorChange}
                    options={[
                      "Arm-Drag",
                      "Clearing ties",
                      "Collar-Tie",
                      "Counter",
                      "Elbow-Tie",
                      "Fake",
                      "From Space",
                      "Front Headlock",
                      "Inside Tie",
                      "Multiple Offensive Attempts",
                      "Outside tie",
                      "Overtie",
                      "Overhook",
                      "Over Under",
                      "Post",
                      "Reach and Go",
                      "Snap",
                      "Shuck",
                      "Slide-by",
                      "Wrists",
                      "Underhook",
                      "2 on 1",
                      "By Zone",
                    ]}
                    label={"Setup/Tags"}
                  />
                )}
              <div style={styles.list}>
                {tags && (
                  <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                    {tags.map(tag => (
                      <li>
                        {" "}
                        <Button onClick={() => removeTag(tag)}>{tag}</Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Grid> */}
            <Grid xs={12} md={6} container direction='column'>
              {timestamp.takedown.offdef === "Offensive" &&
              timestamp.takedown.position === "Standing" ? (
                <>
                  <Select
                    state={timestamp.takedown}
                    fn={setTimestamp}
                    name={"type"}
                    onChange={onSelectorChange}
                    options={["Lower-Body", "Upper-Body", "Throw", "Other"]}
                    label={"type"}
                  />
                  <Select
                    state={timestamp.takedown}
                    fn={setTimestamp}
                    name={"takedown"}
                    onChange={onSelectorChange}
                    options={
                      timestamp.takedown.type === "Upper-Body"
                        ? [
                            "Slide-by",
                            "Duck Under",
                            "Body-Lock",

                            "Push-out",
                            "Underhook-Throwby",
                            "Snap Go behind",
                            "Go behind",

                            "Front Headlock",
                            "Arm-Drag",
                            "Shuck",
                          ]
                        : timestamp.takedown.type === "Lower-Body"
                        ? [
                            "Single Leg",
                            "Double Leg",
                            "High-Crotch",
                            "Outside-Step High-Crotch",
                            "Outside-Reach High-Crotch",
                            "Other Legshot",
                            "Ankle-pick",
                            "Scramble",
                            "Low-Single",
                            "Counter",

                            "Head-outside Low-Single",
                            "Foot Sweep",
                          ]
                        : timestamp.takedown.type === "Throw"
                        ? [
                            "Inside-Trip",
                            "Fireman's",
                            "Outside Fireman's",
                            "Shoulder-Throw",
                            "Headlock",
                            "OverUnder",
                            "Front-headlock",
                            "Other Throw",
                          ]
                        : ["Other"]
                    }
                    label={"Scoring"}
                  />
                </>
              ) : timestamp.takedown.offdef === "Offensive" &&
                timestamp.takedown.position === "Ground" ? (
                <>
                  <Select
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
                  />
                </>
              ) : (
                <>
                  <Select
                    state={timestamp.takedown}
                    fn={setTimestamp}
                    name={"takedown"}
                    onChange={onSelectorChange}
                    options={
                      timestamp.takedown.offdef === "Other"
                        ? [
                            "Caution",
                            "Passivity(Shot-Clock)",
                            "Denied Challenge",
                          ]
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
                  />
                  {timestamp.takedown.offdef !== "Other" && (
                    <Select
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
                    />
                  )}
                </>
              )}
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
