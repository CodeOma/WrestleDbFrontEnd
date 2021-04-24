import React, { useState, useRef, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import Select from "../src/components/Editor/Selector";
import { useGlobalContext } from "../src/context/context";
import TimeStampList from "../src/components/Create/TimeStampList";
// import Video from "../src/components/View/Video";
import axios from "axios";

const TimeStamper = () => {
  const { addScore, videoTime: globalTime } = useGlobalContext();
  const [isDisabled, setIsDisabled] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [toggleSubmit, setToggleSubmit] = useState(true);

  const [finalMatch, setFinalMatch] = useState({
    match: {
      url: "",
      scores: [],
    },
    takedowns: {
      points: "",
      time: "",
      name: "",
      round: "",
      videoTime: 0,
      takedown: "",
      offdef: "",
      setup: "",
      details: "",
    },
  });

  const [matchInfo, setMatchInfo] = useState({
    tournament: "",
    style: "",
    weightClass: "",
    round: "",
    redWrestler: {
      fullName: "Name",
      team: "Name",
    },
    blueWrestler: {
      fullName: "Name",
      team: "Name",
    },
    result: {
      victoryType: "",
      [""]: "",
      [""]: "",
      winner: "",
      loser: "",
    },
    url: "",
  });

  const [redOff, setRedOff] = useState({
    takedown: {
      round: "",
      name: "",
      takedown: "",
      offdef: "off",
      setup: "",
      details: "",
      videoTime: 0,
      time: 0,
      points: 0,
    },
  });
  const [scoringDef, setRedDef] = useState({
    takedown: {
      videoTime: 0,
      round: "",
      name: "",
      takedown: "",
      offdef: "def",
      setup: "",
      details: "",
      time: 0,
      points: 0,
    },
  });
  const [blueOff, setBlueOff] = useState({
    takedown: {
      videoTime: 0,
      round: "",
      name: "",
      takedown: "",
      offdef: "off",
      setup: "",
      details: "",
      time: 0,
      points: 0,
    },
  });
  const [blueDef, setBlueDef] = useState({
    takedown: {
      videoTime: 0,
      round: "",
      name: "",
      takedown: "",
      offdef: "def",
      setup: "",
      details: "",
      time: 0,
      points: 0,
    },
  });

  const styles = {
    root: {
      padding: "10px",
      // backgroundColor: "lightBlue",
      maxHeight: "500px",
    },
  };
  const onSelectorChange = (e, state, fn) => {
    console.log("hello");
    console.log(state);
    console.log(e);
    // console.log(fn);

    fn({
      takedown: {
        ...state.takedown,
        [e.target.name]: e.target.value,
      },
    });
    console.log(redOff);
  };
  // const onMatchInfoSelectorChange = e => {
  //   console.log(e.target.value);
  //   setMatchInfo({
  //     ...matchInfo,

  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleDetails = (e, state, fn) => {
    fn({
      takedown: {
        ...state.takedown,
        details: e.target.value,
      },
    });
  };
  const handleChange = e => {
    setMatchInfo({
      ...matchInfo,
      [e.target.name]: e.target.value,
    });
    console.log(matchInfo);
  };

  const getTime = time => {
    setVideoTime({
      time,
    });
  };
  const submitType = e => {
    console.log(e);
    const submitResult = e.currentTarget.name;
    if (submitResult === "scoringOffensively") {
      addScore(redOff, matchInfo, videoTime);
    } else if (submitResult === "scoringDefensively") {
      addScore(scoringDef, matchInfo, videoTime);
    } else if (submitResult === "losingOffensively") {
      addScore(blueOff, matchInfo, videoTime);
    } else if (submitResult === "losingDefensively") {
      addScore(blueDef, matchInfo, videoTime);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    submitType(e);
    console.log(e.currentTarget);
  };

  return (
    <Grid className='py-1' style={styles.root}>
      <Grid contianer>
        <Video getTime={getTime} />
      </Grid>
      <Grid container justify='center' xs={12}>
        <Grid container xs={12} direction='row'>
          <Grid
            className='px-1'
            container
            xs={6}
            alignItems='flex-start'
            driection='row'
          >
            <div className='pb-1' style={{ display: "block", width: "100%" }}>
              <h4>Red:</h4>
            </div>{" "}
            <Grid
              container
              justify='space-evenly'
              alignItems='flex-start'
              className='px-2'
              xs={6}
              item
              direction='column'
            >
              Offensive
              <Select
                toggle={toggleSubmit}
                state={redOff}
                fn={setRedOff}
                name={"takedown"}
                onChange={onSelectorChange}
                options={[
                  "Single Leg",
                  "Double Leg",
                  "Push-out",
                  "High-Crotch",
                  "Ankle-pick",
                  "Underhook-Throwby",
                  "Snap-go behind",
                  "Counter",
                  "Low-Single",
                  "Slide-by",
                  "Throw",
                  "Front Headlock",
                  "Scramble",
                  "Inside-Trip",
                  "Fireman's",
                  "Outside Fireman's",
                  "Caution",
                  "Passivity",
                  "Other",
                  "Cross Ankles",
                  "Gut Wrench",
                  "Ground Other",
                ]}
                label={"Scoring"}
              />
              <Select
                state={redOff}
                fn={setRedOff}
                name={"setup"}
                onChange={onSelectorChange}
                options={[
                  "N/A",
                  "Fake",
                  "Collar-Tie",
                  "Elbow-Tie",
                  "Post",
                  "Multiple Offensive Attempts",
                  "Inside Tie",
                  "Overtie",
                  "Overhook",
                  "Underhook",
                  "Reach and Go",
                  "Front Headlock",
                  "Snap-go behind",
                  "Counter",
                  "Shuck",
                  "Slide-by",
                  "Takedown Turn",
                ]}
                label={"Setup"}
              />
              <Select
                state={redOff}
                fn={setRedOff}
                name={"pointsScored"}
                onChange={onSelectorChange}
                options={[1, 2, 4, 5]}
                label={"points"}
              />
              <input
                placeholder='any details'
                onChange={e => handleDetails(e, redOff, setRedOff)}
              ></input>
              <Button
                type='submit'
                name='scoringOffensively'
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
            <Grid
              container
              justify='space-evenly'
              alignItems='flex-start'
              className='px-2'
              xs={6}
              item
              direction='column'
            >
              Defensive
              <Select
                state={scoringDef}
                fn={setRedDef}
                name={"takedown"}
                onChange={onSelectorChange}
                options={[
                  "Sprawl go behind",
                  "Chestwrap",
                  "Tilts",
                  "Far Ankle",
                  "Front Headlock",
                  "Counter",
                  "Scramble",
                ]}
                label={"Scoring"}
              />
              <Select
                state={scoringDef}
                fn={setRedDef}
                name={"pointsScored"}
                onChange={onSelectorChange}
                options={[1, 2, 4, 5]}
                label={"points"}
              />
              <input
                onChange={e => handleDetails(e, scoringDef, setRedDef)}
                placeholder='any details'
              ></input>
              <Button
                type='submit'
                name='scoringDefensively'
                onClick={e => handleSubmit(e)}
              >
                Submit
              </Button>
            </Grid>
            <div className='pb-1' style={{ display: "block", width: "100%" }}>
              <h6>Enter Wrestlers Name:</h6>
              <input
                onChange={e => handleChange(e)}
                placeholder='Name'
                name='redWrestler.fullName'
                value={matchInfo.redWrestler.fullName}
              ></input>
              {/* <Select
                state={matchInfo}
                name={"wrestlerColor"}
                onChange={onMatchInfoSelectorChange}
                options={["Red", "Blue"]}
                label={"Color"}
              /> */}
            </div>
          </Grid>
          <Grid
            className='px-1'
            justify='space-evenly'
            alignItems='flex-start'
            container
            xs={6}
            driection='row'
          >
            <div className='pb-1' style={{ display: "block", width: "100%" }}>
              <h4>Blue:</h4>
            </div>
            <Grid
              container
              justify='space-evenly'
              alignItems='flex-start'
              className='px-2'
              xs={6}
              item
              direction='column'
            >
              Offensive
              <Select
                state={blueOff}
                fn={setBlueOff}
                name={"takedown"}
                onChange={onSelectorChange}
                options={[
                  "Single Leg",
                  "Double Leg",
                  "Push-out",
                  "High-Crotch",
                  "Ankle-pick",
                  "Underhook-Throwby",
                  "Snap-go behind",
                  "Counter",
                  "Slide-by",
                  "Throw",
                  "Front Headlock",
                  "Scramble",
                  "Inside-Trip",
                  "Fireman's",
                  "Outside Fireman's",
                  "Caution",
                  "Passivity",
                  "Other",
                  "Cross Ankles",
                  "Gut Wrench",
                  "Ground Other",
                ]}
                label={"Scoring"}
              />
              <Select
                state={blueOff}
                fn={setBlueOff}
                name={"setup"}
                onChange={onSelectorChange}
                options={[
                  "N/A",
                  "Fake",
                  "Collar-Tie",
                  "Elbow-Tie",
                  "Post",
                  "Overtie",
                  "Overhook",
                  "Underhook",
                  "Multiple Offensive Attempts",
                  "Inside Tie",
                  "Reach and Go",
                  "Front Headlock",
                  "Snap-go behind",
                  "Counter",
                  "Shuck",
                  "Slide-by",
                  "Takedown Turn",
                ]}
                label={"Setup"}
              />
              <Select
                state={blueOff}
                fn={setBlueOff}
                name={"pointsScored"}
                onChange={onSelectorChange}
                options={[1, 2, 4, 5]}
                label={"points"}
              />
              <input
                onChange={e => handleDetails(e, blueOff, setBlueOff)}
                placeholder='any details'
              ></input>
              <Button
                type='submit'
                name='losingOffensively'
                onClick={e => handleSubmit(e)}
              >
                Submit
              </Button>
            </Grid>
            <Grid
              container
              justify='space-evenly'
              alignItems='flex-start'
              className='px-2'
              xs={6}
              item
              direction='column'
            >
              Defensive
              <Select
                state={blueDef}
                fn={setBlueDef}
                name={"takedown"}
                onChange={onSelectorChange}
                options={[
                  "Sprawl go behind",
                  "Chestwrap",
                  "Tilts",
                  "Far Ankle",
                  "Front Headlock",
                  "Counter",
                ]}
                label={"Scoring"}
              />
              <Select
                state={blueDef}
                fn={setBlueDef}
                name={"pointsScored"}
                onChange={onSelectorChange}
                options={[1, 2, 4, 5]}
                label={"points"}
              />
              <input
                onChange={e => handleDetails(e, blueDef, setBlueDef)}
                placeholder='any details'
              ></input>
              <Button
                type='submit'
                name='losingDefensively'
                onClick={e => handleSubmit(e)}
              >
                Submit
              </Button>
            </Grid>
            <div className='pb-1' style={{ display: "block", width: "100%" }}>
              <h6>Enter Wrestlers Name:</h6>
              <input
                placeholder='Name'
                onChange={e => handleChange(e)}
                name='blueWrestler.fullName'
                value={matchInfo.blueWrestler.fullName}
              ></input>
              {/* <Select
                state={matchInfo}
                name={"opponentColor"}
                onChange={onMatchInfoSelectorChange}
                options={["Red", "Blue"]}
                label={"Color"}
              /> */}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? "Close" : "Add Match Info"}
        </Button>
        {isOpen && (
          <>
            <div className='pb-1' style={{ display: "block", width: "100%" }}>
              <h6>Match Info:</h6>
              <input
                disabled={isDisabled}
                placeholder='Tournament Name'
              ></input>
              <input disabled={isDisabled} placeholder='Year'></input>
              <Select
                options={[
                  "Qualification",
                  "1/16",
                  "1/8",
                  "Quarter-Final",
                  "Semi-Final",
                  "Final",
                ]}
                label={"Round"}
              />
              <Select
                options={[
                  "57",
                  "61",
                  "65",
                  "70",
                  "74",
                  "79",
                  "86",
                  "92",
                  "97",
                  "125",
                ]}
                label={"Weight Class"}
              />
            </div>
            <Button>Set Match Info</Button>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default TimeStamper;

{
  /* <button
onClick={() => {
  setIsDisabled(!isDisabled);
}}
>
{isDisabled ? "basic" : "detailed"}
</button> */
}
