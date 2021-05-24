import React, { useState, useRef, useEffect } from "react";
import { Grid, Button, FormHelperText } from "@material-ui/core";
import Select from "./Selector";
// import { useGlobalContext } from "../../context/context";
import Video from "../Editor/Video";
import Modal from "./CreateModal";
import Selector from "../../pages/Selector";

import axios from "axios";
// import {
//   getMatch,
//   updateMatch,
//   getMatchByWrestler,
// } from "../../controllers/controller";
import { userUpdateMatch } from "../../controllers/manage/create";
import uniqid from "uniqid";
import SaveIcon from "@material-ui/icons/Save";
import AutocompleteCheckbox from "../Editor/AutocompleteCheckbox2";
import { getWrestlerById } from "../../controllers/controller";
import { userFetchTakedown } from "../../controllers/manage/takedown";

import { userFetchType } from "../../controllers/manage/type";
import { userFetchPosition } from "../../controllers/manage/position";
import { userFetchCategory } from "../../controllers/manage/category";
import { userFetchTag } from "../../controllers/manage/tag";
const Editor = () => {
  // const { addScore, videoTime: globalTime, match } = useGlobalContext();

  const [videoTime, setVideoTime] = useState(0);
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
  const [filteredTakedowns, setFilteredTakedowns] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
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
      tags: [],
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
    const fetchTags = async () => {
      const fetchedTags = await userFetchTag();
      const newArray = fetchedTags.data.map(tag => {
        return { title: tag.tag, id: tag._id };
      });
      setTagOptions(newArray);
    };
    fetchTags();
    const fetchType = async () => {
      const fetchedType = await userFetchType();
      const newArray = fetchedType.data.map(type => {
        return { ...type, title: type.type, id: type._id };
      });
      setTypeOptions(newArray);
    };
    fetchType();
    const fetchPosition = async () => {
      const fetchedPosition = await userFetchPosition();
      const newArray = fetchedPosition.data.map(position => {
        return { ...position, title: position.position, id: position._id };
      });
      setPositionOptions(newArray);
    };
    fetchPosition();
    const fetchCategory = async () => {
      const fetchedCategory = await userFetchCategory();
      const newArray = fetchedCategory.data.map(category => {
        return { ...category, title: category.category, id: category._id };
      });
      setCategoryOptions(newArray);
    };
    fetchCategory();
    const fetchTakedown = async () => {
      const fetchedTakedown = await userFetchTakedown();
      const newArray = fetchedTakedown.data.map(td => {
        return { ...td, title: td.takedown, id: td._id };
      });
      setTakedownOptions(newArray);
    };
    fetchTakedown();
  }, []);
  useEffect(() => {
    const fetch = async () => {
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
      },
    });
  }, [currentWrestler]);
  const handleSubmit = e => {
    e.preventDefault();
    try {
      let fixed = timestamp.takedown;
      setTimestamp({ takedown: { ...timestamp.takedown, tags: tags } });
      if (
        timestamp.takedown.offdef === "Defensive" ||
        timestamp.takedown.offdef === "Other"
      ) {
        fixed = { ...fixed, tags: [], type: "" };
      }
      if (timestamp.takedown.position === "Ground") {
        fixed = { ...fixed, tags: [], type: "Ground" };
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
      const filteredArr = [...finalMatch.scores].filter(
        a => a.id !== timestamp.takedown.id
      );
      const sorted = [...filteredArr, fixed].sort((a, b) => a.time - b.time);
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
          offdef: "1",
          position: "",
          oppDefendedShot: "",
          type: "",
          tags: [],
          details: "",
          videoTime: 0,
          time: 0,
          points: 0,
        },
      });
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, [scoreRed, scoreBlue]);
  useEffect(() => {
    setFilteredTypes(
      typeOptions.filter(type => {
        return type.position !== timestamp.takedown.position;
        //  && type.offdef === timestamp.offdef
      })
    );
    setFilteredTakedowns(
      takedownOptions.filter(td => {
        return (
          td.position === timestamp.takedown.position &&
          td.type === timestamp.takedown.type &&
          td.offdef === timestamp.takedown.offdef
        );
      })
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
      setTags(timestamp.takedown.tags);
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
                <Select
                  state={timestamp.takedown}
                  fn={setTimestamp}
                  name={"wrestler"}
                  onChange={onSelectChange}
                  options={[wrestler.red, wrestler.blue]}
                  label={"Wrestler"}
                />
              </div>
              <Selector
                state={timestamp.takedown}
                fn={setTimestamp}
                name={"offdef"}
                onChange={onSelectorChange}
                options={[
                  { id: 1, title: "Offensive" },
                  { id: 2, title: "Defensive" },
                  { id: 3, title: "Other" },
                ]}
                label={"Offensive/Defensive "}
              />

              <Selector
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
                  state={timestamp.takedown}
                  fn={setTimestamp}
                  name={"points"}
                  onChange={onSelectChange}
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
              <AutocompleteCheckbox
                state={timestamp}
                options={tagOptions}
                setFunction={setTimestamp}
                value={timestamp.takedown.tags}
                name='tags'
              />
            </Grid>
            <Selector
              state={timestamp.takedown}
              fn={setTimestamp}
              name={"type"}
              onChange={onSelectorChange}
              options={filteredTypes}
              label={"type"}
            />
            <Selector
              state={timestamp.takedown}
              fn={setTimestamp}
              name={"takedown"}
              onChange={onSelectorChange}
              options={filteredTakedowns}
              label={"Scoring"}
            />

            <Grid xs={12} md={6} container direction='column'></Grid>
            <Button type='submit' onClick={handleSubmit}>
              {isEdit ? "Save" : "Submit"}
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
