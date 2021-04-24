// import React, { useState, useRef, useEffect } from "react";
// import { Grid, Button } from "@material-ui/core";
// import Select from "./Selector";
// import ReactPlayer from "react-player";
// import { useGlobalContext } from "../context/context";
// import TimeStampList from "./TimeStampList";
// import Video from "./Video";

// const TimeStamper = () => {
//   const { addScore } = useGlobalContext();
//   const [isDisabled, setIsDisabled] = useState(false);
//   const [videoTime, setVideoTime] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);
//   const [toggleSubmit, setToggleSubmit] = useState(true);
//   const [wrestlerInfo, setWrestlerInfo] = useState({
//     wrestler: "Name",
//     opponent: "Name",
//     wrestlerColor: "",
//     opponentColor: "",
//   });
//   // const [scoringInfo, setScoringInfo] = useState({
//   //   videoTime,
//   //   //nested wrestler info need to fix everywhere else
//   //   takedown: {
//   //     scoring: true,
//   //     takedown: "",
//   //     offdef: "",
//   //     setup: "",
//   //     details: "",
//   //     time: 0,
//   //     pointsScored: 0,
//   //   },
//   // });
//   const [scoringOff, setScoringOff] = useState({
//     videoTime,
//     takedown: {
//       scoring: true,
//       takedown: "",
//       offdef: "off",
//       setup: "",
//       details: "",
//       time: 0,
//       pointsScored: 0,
//     },
//   });
//   const [scoringDef, setScoringDef] = useState({
//     videoTime,
//     takedown: {
//       scoring: true,
//       takedown: "",
//       offdef: "def",
//       setup: "",
//       details: "",
//       time: 0,
//       pointsScored: 0,
//     },
//   });
//   const [losingOff, setLosingOff] = useState({
//     videoTime,
//     takedown: {
//       scoring: false,
//       takedown: "",
//       offdef: "off",
//       setup: "",
//       details: "",
//       time: 0,
//       pointsScored: 0,
//     },
//   });
//   const [losingDef, setlosingDef] = useState({
//     videoTime,
//     takedown: {
//       scoring: true,
//       takedown: "",
//       offdef: "def",
//       setup: "",
//       details: "",
//       time: 0,
//       pointsScored: 0,
//     },
//   });

//   const styles = {
//     root: {
//       padding: "10px",
//       // backgroundColor: "lightBlue",
//       maxHeight: "500px",
//     },
//   };
//   const onSelectorChange = (e, state, fn) => {
//     fn({
//       ...state,
//       takedown: {
//         ...state.takedown,
//         [e.target.name]: e.target.value,
//       },
//     });
//     console.log(state);
//   };

//   const onMatchInfoSelectorChange = e => {
//     console.log(e.target.value);
//     setWrestlerInfo({
//       ...wrestlerInfo,

//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleDetails = (e, state, fn) => {
//     setScoringInfo({
//       ...scoringInfo,
//       takedown: {
//         ...scoringInfo.takedown,
//         details: e.target.value,
//       },
//     });
//   };
//   const handleChange = e => {
//     setWrestlerInfo({
//       ...wrestlerInfo,
//       [e.target.name]: e.target.value,
//     });
//     console.log(wrestlerInfo);
//   };

//   const getTime = time => {
//     setScoringInfo({
//       ...scoringInfo,
//       time,
//     });
//     console.log(time);
//   };
//   const setType = e => {
//     const submitResult = e.currentTarget.name;
//     if (submitResult === "scoringOffensively") {
//       setScoringInfo({
//         ...scoringInfo,
//         takedown: {
//           ...scoringInfo.takedown,
//           offdef: "off",
//           scoring: true,
//         },
//       });
//     } else if (submitResult === "scoringDefensively") {
//       setScoringInfo({
//         ...scoringInfo,
//         takedown: {
//           ...scoringInfo.takedown,
//           offdef: "def",
//           scoring: true,
//           setup: "",
//         },
//       });
//     } else if (submitResult === "losingOffensively") {
//       setScoringInfo({
//         ...scoringInfo,
//         takedown: {
//           ...scoringInfo.takedown,
//           offdef: "off",
//           scoring: false,
//         },
//       });
//     } else if (submitResult === "losingDefensively") {
//       console.log("set def loss");
//       setScoringInfo({
//         ...scoringInfo,
//         takedown: {
//           ...scoringInfo.takedown,
//           offdef: "def",
//           scoring: false,
//           setup: "",
//         },
//       });
//     }
//   };
//   useEffect(() => {
//     console.log("yeeet");
//     addScore(scoringInfo, wrestlerInfo);
//   }, [toggleSubmit]);
//   const handleSubmit = e => {
//     e.preventDefault();
//     //setting results to state has to wait for change before
//     //sending to reducer
//     setType(e);
//     setToggleSubmit(!toggleSubmit);

//     console.log(scoringInfo);
//   };

//   return (
//     <Grid className='py-1' style={styles.root}>
//       <Grid contianer>
//         <Video getTime={getTime} />
//       </Grid>
//       <Grid container justify='center' xs={12}>
//         <Grid container xs={12} direction='row'>
//           <Grid
//             className='px-1'
//             container
//             xs={6}
//             alignItems='flex-start'
//             driection='row'
//           >
//             <div className='pb-1' style={{ display: "block", width: "100%" }}>
//               <h4>Scoring:</h4>
//             </div>{" "}
//             <Grid
//               container
//               justify='space-evenly'
//               alignItems='flex-start'
//               className='px-2'
//               xs={6}
//               item
//               direction='column'
//             >
//               Offensive
//               <Select
//                 toggle={toggleSubmit}
//                 state={scoringOff.takedown}
//                 fn={setScoringOff}
//                 name={"takedown"}
//                 onChange={onSelectorChange}
//                 options={[
//                   "Single Leg",
//                   "Double Leg",
//                   "Push-out",
//                   "High-Crotch",
//                   "Ankle-pick",
//                   "Underhook-Throwby",
//                   "Snap-go behind",
//                   "Counter",
//                   "Slide-by",
//                   "Throw",
//                   "Front Headlock",
//                   "Scramble",
//                   "Inside-Trip",
//                   "Fireman's",
//                   "Outside Fireman's",
//                   "Caution",
//                   "Passivity",
//                   "Other",
//                   "Cross Ankles",
//                   "Gut Wrench",
//                   "Ground Other",
//                 ]}
//                 label={"Scoring"}
//               />
//               <Select
//                 state={scoringDef.takedown}
//                 fn={setScoringDef}
//                 name={"setup"}
//                 onChange={onSelectorChange}
//                 options={[
//                   "N/A",
//                   "Fake",
//                   "Collar-Tie",
//                   "Elbow-Tie",
//                   "Post",
//                   "Multiple Offensive Attempts",
//                   "Inside Tie",
//                   "Overtie",
//                   "Overhook",
//                   "Underhook",
//                   "Reach and Go",
//                   "Front Headlock",
//                   "Snap-go behind",
//                   "Counter",
//                   "Shuck",
//                   "Slide-by",
//                   "Takedown Turn",
//                 ]}
//                 label={"Setup"}
//               />
//               <Select
//                 state={scoringInfo.takedown}
//                 name={"pointsScored"}
//                 onChange={onSelectorChange}
//                 options={[1, 2, 4, 5]}
//                 label={"points"}
//               />
//               <input placeholder='any details' onChange={handleDetails}></input>
//               <Button
//                 type='submit'
//                 name='scoringOffensively'
//                 onClick={handleSubmit}
//               >
//                 Submit
//               </Button>
//             </Grid>
//             <Grid
//               container
//               justify='space-evenly'
//               alignItems='flex-start'
//               className='px-2'
//               xs={6}
//               item
//               direction='column'
//             >
//               Defensive
//               <Select
//                 state={scoringInfo.takedown}
//                 name={"takedown"}
//                 onChange={onSelectorChange}
//                 options={[
//                   "Sprawl go behind",
//                   "Chestwrap",
//                   "Tilts",
//                   "Far Ankle",
//                   "Front Headlock",
//                   "Counter",
//                   "Scramble",
//                 ]}
//                 label={"Scoring"}
//               />
//               <Select
//                 state={scoringInfo.takedown}
//                 name={"pointsScored"}
//                 onChange={onSelectorChange}
//                 options={[1, 2, 4, 5]}
//                 label={"points"}
//               />
//               <input onChange={handleDetails} placeholder='any details'></input>
//               <Button
//                 type='submit'
//                 name='scoringDefensively'
//                 onClick={e => handleSubmit(e)}
//               >
//                 Submit
//               </Button>
//             </Grid>
//             <div className='pb-1' style={{ display: "block", width: "100%" }}>
//               <h6>Enter Wrestlers Name:</h6>
//               <input
//                 onChange={e => handleChange(e)}
//                 placeholder='Name'
//                 name='wrestler'
//                 value={wrestlerInfo.wrestler}
//               ></input>
//               <Select
//                 state={wrestlerInfo}
//                 name={"wrestlerColor"}
//                 onChange={onMatchInfoSelectorChange}
//                 options={["Red", "Blue"]}
//                 label={"Color"}
//               />
//             </div>
//           </Grid>
//           <Grid
//             className='px-1'
//             justify='space-evenly'
//             alignItems='flex-start'
//             container
//             xs={6}
//             driection='row'
//           >
//             <div className='pb-1' style={{ display: "block", width: "100%" }}>
//               <h4>Losing Points:</h4>
//             </div>
//             <Grid
//               container
//               justify='space-evenly'
//               alignItems='flex-start'
//               className='px-2'
//               xs={6}
//               item
//               direction='column'
//             >
//               Offensive
//               <Select
//                 state={scoringInfo.takedown}
//                 name={"takedown"}
//                 onChange={onSelectorChange}
//                 options={[
//                   "Single Leg",
//                   "Double Leg",
//                   "Push-out",
//                   "High-Crotch",
//                   "Ankle-pick",
//                   "Underhook-Throwby",
//                   "Snap-go behind",
//                   "Counter",
//                   "Slide-by",
//                   "Throw",
//                   "Front Headlock",
//                   "Scramble",
//                   "Inside-Trip",
//                   "Fireman's",
//                   "Outside Fireman's",
//                   "Caution",
//                   "Passivity",
//                   "Other",
//                   "Cross Ankles",
//                   "Gut Wrench",
//                   "Ground Other",
//                 ]}
//                 label={"Scoring"}
//               />
//               <Select
//                 state={scoringInfo.takedown}
//                 name={"setup"}
//                 onChange={onSelectorChange}
//                 options={[
//                   "N/A",
//                   "Fake",
//                   "Collar-Tie",
//                   "Elbow-Tie",
//                   "Post",
//                   "Overtie",
//                   "Overhook",
//                   "Underhook",
//                   "Multiple Offensive Attempts",
//                   "Inside Tie",
//                   "Reach and Go",
//                   "Front Headlock",
//                   "Snap-go behind",
//                   "Counter",
//                   "Shuck",
//                   "Slide-by",
//                   "Takedown Turn",
//                 ]}
//                 label={"Setup"}
//               />
//               <Select
//                 state={scoringInfo.takedown}
//                 name={"pointsScored"}
//                 onChange={onSelectorChange}
//                 options={[1, 2, 4, 5]}
//                 label={"points"}
//               />
//               <input onChange={handleDetails} placeholder='any details'></input>
//               <Button
//                 type='submit'
//                 name='losingOffensively'
//                 onClick={e => handleSubmit(e)}
//               >
//                 Submit
//               </Button>
//             </Grid>
//             <Grid
//               container
//               justify='space-evenly'
//               alignItems='flex-start'
//               className='px-2'
//               xs={6}
//               item
//               direction='column'
//             >
//               Defensive
//               <Select
//                 state={scoringInfo.takedown}
//                 name={"takedown"}
//                 onChange={onSelectorChange}
//                 options={[
//                   "Sprawl go behind",
//                   "Chestwrap",
//                   "Tilts",
//                   "Far Ankle",
//                   "Front Headlock",
//                   "Counter",
//                 ]}
//                 label={"Scoring"}
//               />
//               <Select
//                 state={scoringInfo.takedown}
//                 name={"pointsScored"}
//                 onChange={onSelectorChange}
//                 options={[1, 2, 4, 5]}
//                 label={"points"}
//               />
//               <input onChange={handleDetails} placeholder='any details'></input>
//               <Button
//                 type='submit'
//                 name='losingDefensively'
//                 onClick={e => handleSubmit(e)}
//               >
//                 Submit
//               </Button>
//             </Grid>
//             <div className='pb-1' style={{ display: "block", width: "100%" }}>
//               <h6>Enter Wrestlers Name:</h6>
//               <input
//                 placeholder='Name'
//                 onChange={e => handleChange(e)}
//                 name='opponent'
//               ></input>
//               <Select
//                 state={wrestlerInfo}
//                 name={"opponentColor"}
//                 onChange={onMatchInfoSelectorChange}
//                 options={["Red", "Blue"]}
//                 label={"Color"}
//               />
//             </div>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid>
//         <Button
//           onClick={() => {
//             setIsOpen(!isOpen);
//           }}
//         >
//           {isOpen ? "Close" : "Add Match Info"}
//         </Button>
//         {isOpen && (
//           <>
//             <div className='pb-1' style={{ display: "block", width: "100%" }}>
//               <h6>Match Info:</h6>
//               <input
//                 disabled={isDisabled}
//                 placeholder='Tournament Name'
//               ></input>
//               <input disabled={isDisabled} placeholder='Year'></input>
//               <Select
//                 options={[
//                   "Qualification",
//                   "1/16",
//                   "1/8",
//                   "Quarter-Final",
//                   "Semi-Final",
//                   "Final",
//                 ]}
//                 label={"Round"}
//               />
//               <Select
//                 options={[
//                   "57",
//                   "61",
//                   "65",
//                   "70",
//                   "74",
//                   "79",
//                   "86",
//                   "92",
//                   "97",
//                   "125",
//                 ]}
//                 label={"Weight Class"}
//               />
//             </div>
//             <Button
//               onClick={() => {
//                 setScoringInfo({ ...scoringInfo, wrestlerInfo });
//               }}
//             >
//               Set Match Info
//             </Button>
//           </>
//         )}
//       </Grid>
//     </Grid>
//   );
// };

// export default TimeStamper;

// {
//   /* <button
// onClick={() => {
//   setIsDisabled(!isDisabled);
// }}
// >
// {isDisabled ? "basic" : "detailed"}
// </button> */
// }
