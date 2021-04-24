import React, { useState, useRef, useEffect } from "react";
import { Grid, Button, FormHelperText, Card } from "@material-ui/core";
import Select from "./Selector";
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
import Alert from "../components/Alert";
const Editor = () => {
  const [videoTime, setVideoTime] = useState(0);
  const [wrestlerId, setWrestlerId] = useState("6042f3208e4ff31a532f7324");
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editingRender, setEditingRender] = useState(false);
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const fetch = await axios.get("http://localhost:5000/match");
  //     const data = await fetch.data[0];
  //     await setMatchData({ ...data });
  //     console.log(matchData);
  //   };
  //   fetchData();
  // }, []);
  // useEffect(() => {}, [matchData]);
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
  const handleTimestamp = id => {
    try {
      const selected = filtered(id);
      // console.log(selected);
      setTimestamp({
        takedown: { ...timestamp.takedown, ...selected },
      });

      console.log(timestamp);
      setEditingRender(!editingRender);
    } catch (error) {
      console.log(error);
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
  useEffect(() => {
    // handleTimestamp();
  }, [editingRender]);
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
          setMatchEdit={handleTimestamp}
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
              />
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
            <Alert severity='error' title='error' message='missing' />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Editor;

{
  /* <Select
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
                        "Off whistle",
                        "Outside tie",
                        "Overtie",
                        "Overhook",
                        "Over Under",
                        "Off Opponent Snap",
                        "Post",
                        "Reach and Go",
                        "Reversal",
                        "Scramble",
                        "Seatbelt",

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
                    <div style={styles.list}>
                      {tags && (
                        <ul
                          style={{
                            listStyleType: "none",
                            padding: 0,
                            margin: 0,
                          }}
                        >
                          {tags.map(tag => (
                            <li>
                              {" "}
                              <Button onClick={() => removeTag(tag)}>
                                {tag}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div> */
}

//                <Grid
//       className='px-1'
//       container
//       alignItems='flex-start'
//       driection='row'
//     >
//       <div className='pb-1' style={{ display: "block", width: "100%" }}>
//         <h4>{timestamp.takedown.name && timestamp.takedown.name}</h4>
//       </div>{" "}
//       <Grid
//         container
//         justify='space-evenly'
//         // alignItems='flex-start'
//         className='px-2'
//         item
//         // direction='column'
//       >
//         <Select
//           state={timestamp.takedown}
//           fn={setTimestamp}
//           name={"offdef"}
//           onChange={onSelectorChange}
//           options={["Offensive", "Defensive", "Other"]}
//           label={"Offensive/Defensive "}
//         />
//         {timestamp.takedown.offdef !== "Other" && (
//           <Select
//             state={timestamp.takedown}
//             fn={setTimestamp}
//             name={"position"}
//             onChange={onSelectorChange}
//             options={["Standing", "Ground"]}
//             label={"Position"}
//           />
//         )}

//         {timestamp.takedown.offdef === "Offensive" &&
//         timestamp.takedown.position === "Standing" ? (
//           <>
//             <Select
//               state={timestamp.takedown}
//               fn={setTimestamp}
//               name={"type"}
//               onChange={onSelectorChange}
//               options={["Lower-Body", "Upper-Body", "Throw", "Other"]}
//               label={"type"}
//             />
//             <Select
//               state={timestamp.takedown}
//               fn={setTimestamp}
//               name={"takedown"}
//               onChange={onSelectorChange}
//               options={
//                 timestamp.takedown.type === "Upper-Body"
//                   ? [
//                       "Slide-by",
//                       "Duck Under",
//                       "Push-out",
//                       "Underhook-Throwby",
//                       "Snap Go behind",
//                       "Go behind",
//                       "Front Headlock",
//                       "Arm-Drag",
//                       "Shuck",
//                       "Body-Lock",
//                     ]
//                   : timestamp.takedown.type === "Lower-Body"
//                   ? [
//                       "Single Leg",
//                       "Double Leg",
//                       "High-Crotch",
//                       "Outside-Reach High-Crotch",
//                       "Other Legshot",

//                       "Outside-Step High-Crotch",
//                       "Ankle-pick",
//                       "Scramble",
//                       "Low-Single",
//                       "Counter",

//                       "Head-outside Low-Single",
//                       "Foot Sweep",
//                     ]
//                   : timestamp.takedown.type === "Throw"
//                   ? [
//                       "Inside-Trip",
//                       "Fireman's",
//                       "Outside Fireman's",
//                       "Shoulder-Throw",
//                       "Headlock",
//                       "OverUnder",
//                       "Front-headlock",
//                       "Suplex",

//                       "Other Throw",
//                     ]
//                   : ["Other"]
//               }
//               label={"Scoring"}
//             />
//             <Grid>

//               <AutocompleteCheckbox
//                 options={[
//                   "Arm-Drag",
//                   "Clearing ties",
//                   "Collar-Tie",
//                   "Counter",
//                   "Elbow-Tie",
//                   "Fake",
//                   "From Space",
//                   "Front Headlock",
//                   "Inside Tie",
//                   "Multiple Offensive Attempts",
//                   "Off whistle",
//                   "Outside tie",
//                   "Overtie",
//                   "Overhook",
//                   "Over Under",
//                   "Off Opponent Snap",
//                   "Post",
//                   "Reach and Go",
//                   "Reversal",
//                   "Scramble",
//                   "Seatbelt",

//                   "Snap",
//                   "Shuck",
//                   "Slide-by",
//                   "Wrists",
//                   "Underhook",
//                   "2 on 1",
//                   "By Zone",
//                 ]}
//               />
//             </Grid>
//           </>
//         ) : timestamp.takedown.offdef === "Offensive" &&
//           timestamp.takedown.position === "Ground" ? (
//           <>
//             <Select
//               state={timestamp.takedown}
//               fn={setTimestamp}
//               name={"takedown"}
//               onChange={onSelectorChange}
//               options={[
//                 "Cross Ankles",
//                 "Gut Wrench",
//                 "High gutwrench",
//                 "Low gutwrench",
//                 "Ground Other",
//                 "Takedown Turn",
//                 "Tilt",
//               ]}
//               label={"Scoring"}
//             />
//           </>
//         ) : (
//           <>
//             <Select
//               state={timestamp.takedown}
//               fn={setTimestamp}
//               name={"takedown"}
//               onChange={onSelectorChange}
//               options={
//                 timestamp.takedown.offdef === "Other"
//                   ? [
//                       "Caution",
//                       "Passivity(Shot-Clock)",
//                       "Denied Challenge",
//                     ]
//                   : [
//                       "Go behind",
//                       "Chestwrap",
//                       "Re-shot",
//                       "Tilts",
//                       "Far Ankle",
//                       "Front Headlock",
//                       "Counter",
//                       "Olympic Lift",
//                       "Scramble",
//                       "Step Over",
//                       "Switch lift",
//                       "Whizzer",
//                     ]
//               }
//               label={"Scoring"}
//             />
//             {timestamp.takedown.time > 0 ? (
//               <p>
//                 {`${Math.floor(timestamp.takedown.time / 60)}m
//  ${
//    timestamp.takedown.time - Math.floor(timestamp.takedown.time / 60) * 60
//  } sec`}
//               </p>
//             ) : (
//               <Grid direction='column'>
//                 <input
//                   value={timestamp.takedown.time}
//                   style={styles.input}
//                   name={"time"}
//                   // placeholder='time'
//                   onChange={e => handleDetails(e)}
//                 />
//                 <FormHelperText>time</FormHelperText>
//               </Grid>
//             )}
//             {timestamp.takedown.offdef !== "Other" && (
//               <Select
//                 state={timestamp.takedown}
//                 fn={setTimestamp}
//                 name={"oppDefendedShot"}
//                 onChange={onSelectorChange}
//                 options={[
//                   "Push-out",
//                   "Underhook-Throwby",
//                   "Go behind",
//                   "Front Headlock",
//                   "Slide-by",
//                   "Body-Lock",

//                   "Single Leg",
//                   "Double Leg",
//                   "High-Crotch",
//                   "Outside-Reach High-Crotch",
//                   "Outside-Step High-Crotch",
//                   "Ankle-pick",
//                   "Scramble",
//                   "Low-Single",
//                   "Counter",
//                   "Head-outside Low-Single",
//                   "Other Legshot",

//                   "Inside-Trip",
//                   "Fireman's",
//                   "Outside Fireman's",
//                   "Shoulder-Throw",
//                   "Headlock",
//                   "OverUnder",
//                   "Front-headlock",
//                   "Step Over",

//                   "Other Throw",
//                 ]}
//                 label={"Countered takedown"}
//               />
//             )}
//           </>
//         )}

//         {/* <input
//           placeholder='any details'
//           onChange={e => handleDetails(e)}
//         ></input> */}
//         {/*
//         {tags.map(tag => (
//           <Grid>
//             <Button onClick={() => removeTag(tag)}>{tag}</Button>
//           </Grid>
//         ))} */}
//         <Button type='submit' onClick={handleSubmit}>
//           Submit
//         </Button>
//       </Grid>
//       <Button onClick={() => updateMatch(matchData)}>Save Match</Button>
//     </Grid>
