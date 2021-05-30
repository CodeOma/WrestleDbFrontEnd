import React, { useState, useEffect } from "react";
import { Grid, Button, FormHelperText, TextField } from "@material-ui/core";
import Select from "./Selector";

import Video from "../Editor/Video";
import Modal from "./CreateModal";
import Selector from "../../pages/Selector";
import Alert from "../components/Alert";

import uniqid, { time } from "uniqid";
import SaveIcon from "@material-ui/icons/Save";
import AutocompleteCheckbox from "../Editor/AutocompleteCheckbox2";
import { userFetchWrestlerById } from "../../controllers/manage/wrestler";
import { userFetchTakedown } from "../../controllers/manage/takedown";

import { userFetchType } from "../../controllers/manage/type";
import { userFetchPosition } from "../../controllers/manage/position";
import { userFetchCategory } from "../../controllers/manage/category";
import { userFetchTag } from "../../controllers/manage/tag";
import { userCreateMatch } from "../../controllers/manage/match";
const Editor = () => {
  const [videoTime, setVideoTime] = useState(0);
  const [wrestlerId, setWrestlerId] = useState("6042f3208e4ff31a532f7324");
  const [currentWrestler, setCurrentWrestler] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  // const [editId, setEditId] = useState("");
  const [editingRender, setEditingRender] = useState(false);

  const [positionOptions, setPositionOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [takedownOptions, setTakedownOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [filteredTakedowns, setFilteredTakedowns] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //For Alerts
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");
  /////
  const [wrestler, setWrestler] = useState({
    red: "",
    redId: "",
    blue: "",
    blueId: "",
  });

  const [timestamp, setTimestamp] = useState({
    takedown: {
      id: uniqid.process(),
      round: 1,
      wrestlerId: "",
      takedown: "",
      offdef: "Offensive",
      position: "",
      oppDefendedShot: "",
      type: "",
      setup: [],
      details: "",
      videoTime: 0,
      time: 0,
      points: "",
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
    setIsLoading(true);
    const fetchTags = async () => {
      const fetchedTags = await userFetchTag();
      const newArray = fetchedTags.data.map(tag => {
        return tag.tag;
      });
      setTagOptions(newArray);
    };
    fetchTags();
    const fetchType = async () => {
      const fetchedType = await userFetchType();
      const newArray = fetchedType.data.map(type => {
        return type;
      });
      setTypeOptions(newArray);
    };
    fetchType();
    const fetchPosition = async () => {
      const fetchedPosition = await userFetchPosition();
      const newArray = fetchedPosition.data.map(position => {
        return position.position;
      });
      setPositionOptions(newArray);
    };
    fetchPosition();
    // const fetchCategory = async () => {
    //   const fetchedCategory = await userFetchCategory();
    //   const newArray = fetchedCategory.data.map(category => {
    //     return category.category;
    //   });
    //   setCategoryOptions(newArray);
    // };
    // fetchCategory();
    const fetchTakedown = async () => {
      const fetchedTakedown = await userFetchTakedown();
      const newArray = fetchedTakedown.data;
      setTakedownOptions(newArray);
    };
    fetchTakedown();
    setIsLoading(false);
  }, []);
  useEffect(() => {
    const fetch = async () => {
      try {
        if (wrestler.redId && wrestler.blueId) {
          const redData = await userFetchWrestlerById(wrestler.redId);
          const blueData = await userFetchWrestlerById(wrestler.blueId);

          setFinalMatch({
            ...finalMatch,
            redWrestler: {
              id: redData.data[0]._id,
              fullName: redData.data[0].fullName,
              team: redData.data[0].team,
            },
            blueWrestler: {
              id: blueData.data[0]._id,
              fullName: blueData.data[0].fullName,
              // lastName: blueData.data[0].lastName,
              team: blueData.data[0].team,
            },
          });
          setScoreRed({
            ...scoreRed,
            name: redData.data[0].fullName,
            id: redData.data[0]._id,
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
    fetch();
  }, [wrestler]);

  const [finalMatch, setFinalMatch] = useState({
    tournament: {
      tournamentName: "",
      tournamentId: "",
      tournamentType: "",
    },
    style: "",
    weightClass: "",
    round: "",
    result: {
      victoryType: "",
      winner: "",
      loser: "",
      winnerPoints: "",
      loserPoints: "",
      redTotalScore: 0,
      blueTotalScore: 0,
    },
    redWrestler: {
      id: "",
      fullName: "",

      team: "",
    },
    blueWrestler: {
      id: "",
      fullName: "",
      team: "",
    },

    url: "",

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
      borderSaveStyle: "hidden",
      borderRightStyle: "hidden",
      borderLeftStyle: "hidden",
      width: "50px",
    },
  };
  const onSelectChange = e => {
    if (e.target.name === "wrestler") {
      if (e.target.value === scoreRed.name) {
        setCurrentWrestler(scoreRed);
      } else if (e.target.value === scoreBlue.name) {
        setCurrentWrestler(scoreBlue);
      }
    }
    // if (e.target.name === "setup") {
    //   setTags([...tags, e.target.value]);
    // }

    // setTimestamp({
    //   takedown: {
    //     ...timestamp.takedown,
    //     [e.target.name]: e.target.value,
    //   },
    // });

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
  const onSelectorChange = e => {
    try {
      setTimestamp({
        takedown: {
          ...timestamp.takedown,
          [e.target.name]: e.target.value,
        },
      });
    } catch (err) {
      console.log(err);
    }
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
    setTimestamp({
      takedown: {
        ...timestamp.takedown,
        wrestlerId: currentWrestler.id,
        fullName: currentWrestler.name,
      },
    });
    console.log(currentWrestler);
  }, [currentWrestler]);
  const handleSave = async () => {
    try {
      if (
        !finalMatch.tournament.tournamentId ||
        !finalMatch.tournament.tournamentId
      ) {
      }

      const create = await userCreateMatch(finalMatch);
      console.log("create", create.message);
      if (create?.response?.statusText === "Bad Request") {
        throw new Error(create.response.data.error);
      }
      if (create?.message === "Network Error") {
        throw new Error("Network Error");
      }
      if (create.statusText === "OK") {
        setSaveSuccess("Created Succesfully!");
      }
    } catch (e) {
      console.log(e.name, e.message);
      setSaveError(e.message);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    try {
      Object.entries(timestamp.takedown).forEach(([k, v]) => {
        if (v === "") {
          console.log(k);

          if (k !== "oppDefendedShot" && k !== "details" && k !== "id") {
            throw new Error(`${k} missing`);
          }
        }
      });

      if (!timestamp.takedown.wrestlerId) {
        throw new Error(`Wrestler missing, try switching and trying again`);
      }
      if (timestamp.takedown.time === 0) {
        setWarning("Time is 0");
      }
      if (timestamp.takedown.videoTime === 0) {
        setWarning("Video time is 0");
      }
      // if(timestamp.takedown === '' || timestamp.takedown === ''|| timestamp ){

      // let fixed = timestamp.takedown;
      //removed tags:tags
      // setTimestamp({ takedown: { ...timestamp.takedown } });

      const filteredArr = [...finalMatch.scores].filter(
        a => a.id !== timestamp.takedown.id
      );
      const sorted = [...filteredArr, timestamp.takedown].sort(
        (a, b) => a.time - b.time
      );

      const totalRed = sorted
        .filter(takedown => takedown.wrestlerId === finalMatch.redWrestler.id)
        .reduce((a, score) => parseInt(score.points) + a, 0);
      const totalBlue = sorted
        .filter(takedown => takedown.wrestlerId === finalMatch.blueWrestler.id)
        .reduce((a, score) => parseInt(score.points) + a, 0);

      setFinalMatch({
        ...finalMatch,
        scores: sorted,

        result: {
          ...finalMatch.result,
          redTotalScore: totalRed,
          blueTotalScore: totalBlue,
        },
      });
      setTimestamp({
        takedown: {
          id: uniqid.process(),
          round: timestamp.takedown.round,
          wrestlerId: currentWrestler.id,
          fullName: currentWrestler.name,
          // color: currentWrestler.color,
          takedown: "",
          offdef: "Offensive",
          position: "",
          oppDefendedShot: "",
          type: "",
          setup: [],
          details: "",
          videoTime: 0,
          time: 0,
          points: "",
        },
      });
      setIsEdit(false);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => setError(""), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);
  useEffect(() => {
    const timer = setTimeout(() => setSaveError(""), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [saveError]);
  useEffect(() => {
    const timer = setTimeout(() => setWarning(""), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [warning]);
  useEffect(() => {
    const timer = setTimeout(() => setSaveSuccess(""), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [saveSuccess]);
  // commented this out double check on later
  // useEffect(() => {}, [scoreRed, scoreBlue]);
  useEffect(() => {
    setFilteredTypes(
      typeOptions
        .filter(type => {
          return type.position === timestamp.takedown.position;
          //  && type.offdef === timestamp.offdef
        })
        .map(t => t.type)
    );
    setFilteredTakedowns(
      takedownOptions
        .filter(td => {
          return (
            td.position === timestamp.takedown.position &&
            td.type === timestamp.takedown.type &&
            td.offdef === timestamp.takedown.offdef
          );
        })
        .map(td => td.takedown)
    );
    //
  }, [timestamp]);
  const deleteTimestamp = id => {
    const filtered = finalMatch.scores.filter(t => t.id !== id);
    setFinalMatch({
      ...finalMatch,
      scores: filtered,
    });
  };
  const filtered = id => {
    try {
      const [x] = finalMatch.scores.filter(t => t.id === id);
      return x;
    } catch (e) {
      console.log(e);
    }
  };
  const handleTimestamp = id => {
    try {
      const selected = filtered(id);
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
      // setTags(timestamp.takedown.setup);
    } catch (error) {
      console.log(error);
    }
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
        {saveError && (
          <Alert title='Error' severity='error' message={saveError} />
        )}
        {saveSuccess && (
          <Alert title='Success' severity='success' message={saveSuccess} />
        )}
        <Button
          onClick={() => {
            //updateMatch(finalMatch)
            console.log(finalMatch);
            handleSave();
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
                <Select
                  value={timestamp.takedown.wrestler}
                  state={timestamp.takedown}
                  fn={setTimestamp}
                  name={"wrestler"}
                  onChange={onSelectChange}
                  options={[wrestler.red, wrestler.blue]}
                  label={"Wrestler"}
                />
              </div>
              <Select
                value={timestamp.takedown.offdef}
                state={timestamp.takedown}
                fn={setTimestamp}
                name={"offdef"}
                onChange={onSelectorChange}
                options={["Offensive", "Defensive", "Other"]}
                label={"Offensive/Defensive "}
              />

              <Select
                value={timestamp.takedown.position}
                state={timestamp.takedown}
                fn={setTimestamp}
                name={"position"}
                disabled={timestamp.takedown.offdef === "Other" ? true : false}
                onChange={onSelectorChange}
                options={positionOptions}
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
                  value={timestamp.takedown.points}
                  state={timestamp.takedown}
                  fn={setTimestamp}
                  name={"points"}
                  onChange={onSelectChange}
                  options={[1, 2, 4, 5]}
                  label={"points"}
                />
                <Select
                  value={timestamp.takedown.round}
                  state={timestamp.takedown}
                  fn={setTimestamp}
                  name={"round"}
                  onChange={onSelectorChange}
                  options={["1", "2"]}
                  label={"round"}
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
                <TextField
                  id='video time'
                  label='Video time'
                  type='number'
                  value={timestamp.takedown.videoTime}
                  onChange={e =>
                    setTimestamp({
                      takedown: {
                        ...timestamp.takedown,
                        videoTime: e.target.value,
                      },
                    })
                  }
                  placeholder='Video Time'
                  margin='normal'
                />

                {/* <input
                  name={"details"}
                  placeholder='any details'
                  onChange={e => handleDetails(e)}
                ></input> */}
              </Grid>
            </Grid>
          </Grid>

          {/* <Button
            onClick={() => console.log(currentWrestler, finalMatch, timestamp)}
          >
            Press
          </Button> */}
          <Grid
            container
            alignItems='flex-start'
            direction='row'
            // justify='center'
            justify='space-evenly'
            //  alignItems='center'
            xs={5}
          >
            <Grid xs={12} md={12}>
              {error && (
                <Alert title='Error' severity='error' message={error} />
              )}
              {warning && (
                <Alert title='Warning' severity='warning' message={warning} />
              )}
              <Grid container xs={12} direction='row'>
                <Grid direction='column' xs={12} md={6} container>
                  <AutocompleteCheckbox
                    state={timestamp}
                    options={tagOptions}
                    setFunction={setTimestamp}
                    value={timestamp.takedown.setup}
                    name='setup'
                  />
                </Grid>
                <Grid direction='column' xs={12} md={6} container>
                  <Select
                    value={timestamp.takedown.type}
                    state={timestamp.takedown}
                    fn={setTimestamp}
                    name={"type"}
                    onChange={onSelectorChange}
                    options={filteredTypes}
                    label={"type"}
                  />
                  <Select
                    value={timestamp.takedown.takedown}
                    state={timestamp.takedown}
                    fn={setTimestamp}
                    name={"takedown"}
                    onChange={onSelectorChange}
                    options={filteredTakedowns}
                    label={"Scoring"}
                  />

                  {timestamp.takedown.offdef === "Defensive" && (
                    <Select
                      value={timestamp.takedown.oppDefendedShot}
                      state={timestamp.takedown}
                      fn={setTimestamp}
                      name={"oppDefendedShot"}
                      onChange={onSelectorChange}
                      options={takedownOptions.map(td => td.takedown)}
                      label={"Defended Shot"}
                    />
                  )}
                </Grid>
              </Grid>{" "}
            </Grid>
            <Grid xs={12} md={6} container direction='column'></Grid>
            <Button type='submit' onClick={handleSubmit}>
              {isEdit ? "Save" : "Submit"}
            </Button>
            {isEdit && (
              <Button
                onClick={() => {
                  setIsEdit(false);
                  setTimestamp({
                    takedown: {
                      id: uniqid.process(),
                      round: timestamp.takedown.round,
                      wrestlerId: currentWrestler.id,
                      fullName: currentWrestler.name,
                      // color: currentWrestler.color,
                      takedown: "",
                      offdef: "Offensive",
                      position: "",
                      oppDefendedShot: "",
                      type: "",
                      setup: [],
                      details: "",
                      videoTime: 0,
                      time: 0,
                      points: "",
                    },
                  });
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
