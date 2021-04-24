import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import GraphBar from "../../components/Stats/GraphBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button, Card } from "@material-ui/core";
import axios from "axios";
import VideoModal from "../../components/components/VideoModal";
import DataTable from "../../components/components/Table";
import { individualProfileStats } from "../../controllers/controller";
import { timeFormatter, youtubeVideoId } from "../../helpers/formatting";
// const styles = {
//   graph:{

//   }
// }
// These labels appear in the legend and in the tooltips when hovering different arcs
const WrestlerProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [wrestler, setWrestler] = useState("");
  // const [wrestlerId, setWrestlerId] = useState("6042f3098e4ff31a532f72c6");
  const [isOpen, setIsOpen] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [data, setData] = useState([]);
  const [graphDataList, setGraphDataList] = useState([]);
  const [matchInfo, setMatchInfo] = useState({
    title: "Matches",
    rows: [],
    columns: [],
  });
  const [wrestlerId, setWrestlerId] = useState("6042f3208e4ff31a532f7324");
  const [wrestlerStats, setWrestlerStats] = useState({
    avgPCPM: "",
    avgPSPM: "",
    fullName: "",
    losses: "",
    wins: "",
    matchesScoreFirst: "",
    matchesScoreLast: "",
    pspcRatio: "",
    scoreFirstPerc: "",
    opponentsBeat: [],
    opponentsLostTo: [],
    scorelastPerc: "",
    totalMatches: "",
    totalPC: "",
    totalPS: "",
    winPercentage: "",
  });
  const [tdData, setTdData] = useState({
    type: "pie",
    title: "Points Scored",
    data: [],
    labels: [],
    options: {
      legend: {
        display: true,
        rtl: true,
        labels: {
          fontColor: "#333",
        },
      },
      onClick: (e, item) => {
        const index = item[0]?._index;
        const obj =
          item[0]?._chart?.config?.data?.datasets[0].yeet[0][0][index];
        console.log(item[0]?._chart?.config?.data?.datasets[0].yeet[0][0]);

        if (obj) {
          setGraphDataList(
            item[0]?._chart?.config?.data?.datasets[0].yeet[0][0]
          );
          setData(Object.values(obj));
          setIsOpen(true);
        }
      },
      responsive: false,
    },
  });
  const [tdcData, setTdcData] = useState({
    type: "pie",
    title: "Points Given Up",
    data: [],
    labels: [],
    options: {
      onClick: (e, item) => {
        const index = item[0]?._index;
        const obj =
          item[0]?._chart?.config?.data?.datasets[0].yeet[0][0][index];
        if (obj) {
          setData(Object.values(obj));
          setIsOpen(true);
        }
      },
    },
  });

  const [scoreType, setScoreType] = useState({
    type: "bar",
    title: "Score type",
    data: [],
    labels: [],
    options: {
      onClick: (e, item) => {
        const index = item[0]?._index;
        const obj =
          item[0]?._chart?.config?.data?.datasets[0].yeet[0][0][index];
        if (obj) {
          setData(Object.values(obj));
          setIsOpen(true);
        }
      },
      // onClick: (e, item) => {
      //   console.log(
      //     `Item with text ${item[0]._index} and index ${item[0]._datasetIndex} clicked`
      //   );
      // },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
  const matches = (array, fn, currData) => {
    console.log(array);
    const rows = array.map((field, i) => {
      console.log(field);
      return { id: i, url: field.url, ...field };
    });
    // const columns = Object.keys(array[0]).map(k => {
    //   return { field: k, headerName: k, width: 160 };
    // });
    const columns = [
      { field: "tournamentName", headerName: "Tournament", width: 350 },
      { field: "round", headerName: "Round", width: 160 },

      { field: "winner", headerName: "Winner", width: 200 },
      { field: "loser", headerName: "Loser", width: 200 },
      { field: "weightClass", headerName: "Weight Class", width: 160 },

      // { field: "url", headerName: "Video", width: 300 },
    ];
    fn({
      ...currData,
      columns,
      rows,
      // array: [array],
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetch = await individualProfileStats("6042f2898e4ff31a532f717c");

        const data = await fetch.data;

        // const data2 = await fetch[1].data;
        console.log(data);
        setWrestlerStats({
          avgPCPM: data[0][0].avgPCPM,

          avgPSPM: data[0][0].avgPSPM,
          fullName: data[0][0].fullName,
          losses: data[0][0].losses,
          wins: data[0][0].wins,

          matchesScoreFirst: data[0][0].matchesScoreFirst,
          matchesScoreLast: data[0][0].matchesScoreLast,
          pspcRatio: data[0][0].pspcRatio,
          scoreFirstPerc: data[0][0].scoreFirstPerc,
          opponentsBeat: data[0][0].opponentsBeat,
          opponentsLostTo: data[0][0].opponentsLostTo,
          scorelastPerc: data[0][0].scorelastPerc,
          totalMatches: data[0][0].totalMatches,
          totalPC: data[0][0].totalPC,
          totalPS: data[0][0].totalPS,
          winPercentage: data[0][0].winPercentage,
        });
        // setProfileData(data2);
        // setTdData(data2);
        const initGraph = (array, fn, currData) => {
          // const labels = new Set();
          // array.splice(0, 7).forEach(t => {
          //   obj.labels.push(t._id ? t._id : "Other");
          //   obj.data.push(t.number);
          // });

          // let x = 0;
          // let y = [];
          // array.splice(0, 7).forEach(t => {
          //   x += t.number;
          // });
          // obj.labels.push("Other");
          // obj.data.push(x);
          const obj = {
            data: [],
            labels: [],
          };
          array.forEach(t => {
            obj.labels.push(t._id ? t._id : "Other");
            obj.data.push(t.number);
          });
          fn({
            ...currData,
            labels: obj.labels,
            data: obj.data,
            array: [array],
          });
        };

        // matches(data.matches, setMatchInfo, matchInfo);

        initGraph(data[2], setTdData, tdData);
        initGraph(data[1], setTdcData, tdcData);

        initGraph(data[4], setScoreType, scoreType);

        // setWrestler(data.wrestler[0].fullName);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {}, [isOpen]);
  const styles = {
    root: {
      backgroundColor: "white",

      p: {
        fontSize: "10",
      },
    },
    $p: {
      fontSize: "10",
    },
  };
  return (
    <Grid className='m-4 pt-4' style={styles.root}>
      <h2 className='ml-4 pt-4 pt-2'>{wrestlerStats.fullName} </h2>

      <Grid
        container
        className='mt-2 pt-4'
        alignItems='flex-start'
        direction='row'
        justify='space-evenly'
        xs={12}
      >
        <Grid sm={4}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <h5>Profile</h5>
              <Card>
                <ul style={{ listStyle: "none" }}>
                  <h5 className='py-2'>Stats</h5>
                  <h6>Matches:</h6>
                  <li className='pl-4'>Wins: {wrestlerStats.wins}</li>
                  <li className='pl-4'>Losses: {wrestlerStats.losses}</li>
                  <li className='pl-4'>
                    Win Percentage: {wrestlerStats.winPercentage}
                  </li>
                  <li className='pl-4'>
                    Total Matches:{wrestlerStats.totalMatches}
                  </li>
                  <h6>Scores:</h6>
                  <li className='pl-4'>
                    Total Points Conceded: {wrestlerStats.totalPC}
                  </li>
                  <li className='pl-4'>
                    Total Points Scored:{wrestlerStats.totalPS}
                  </li>
                  <li className='pl-4'>
                    Average Points Conceded: {wrestlerStats.avgPCPM}
                  </li>
                  <li className='pl-4'>
                    Average Points Scored:{wrestlerStats.avgPSPM}
                  </li>
                  <li className='pl-4'>
                    Matches Score First: {wrestlerStats.matchesScoreFirst}
                  </li>
                  <li className='pl-4'>
                    Matches Score Last: {wrestlerStats.matchesScoreLast}
                  </li>
                  <li className='pl-4'>
                    Point Scored/Condceded: {wrestlerStats.pspcRatio}
                  </li>
                  <li className='pl-4'>
                    Score First (%): {wrestlerStats.scoreFirstPerc}
                  </li>
                  {/* <li>Opponents Beat: {wrestlerStats.opponentsBeat}</li> */}
                  {/* <li>opponentsLostTo: {wrestlerStats.opponentsLostTo}</li> */}
                  <li className='pl-4'>
                    Score Last (%): {wrestlerStats.scorelastPerc}
                  </li>
                </ul>
              </Card>
            </>
          )}
        </Grid>
        <Grid className='pt-3' item sm={6} md={4}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <h6>Score Type</h6>

              <GraphBar tableData={scoreType} />
            </>
          )}
        </Grid>
      </Grid>
      <Grid
        container
        alignItems='flex-start'
        direction='row'
        justify='space-evenly'
        className='pt-4'
      >
        <Grid item>
          <h6> Points Scored</h6>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <GraphBar
              setIsOpen={setIsOpen}
              setData={setData}
              tableData={tdData}
            />
          )}
        </Grid>
        <Grid item>
          <h6> Points Given Up</h6>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <GraphBar
              setIsOpen={setIsOpen}
              setData={setData}
              tableData={tdcData}
            />
          )}
        </Grid>

        <Grid className='pl-2' item md={3}>
          {/* <h6> Set Ups/Tags</h6>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <GraphBar
              setIsOpen={setIsOpen}
              setData={setData}
              tableData={tdcData}
            />
          )} */}
        </Grid>
        <Grid className='px-4' direction='row' container xs={12}>
          <h5> Videos</h5>
          {!isOpen && !isLoading && false && (
            <Grid xs={6}>
              {/* <h6>{graphDataList[0]}</h6> */}

              <ul style={{ padding: 0, margin: 0 }}>
                {graphDataList.map(i => (
                  <Card className='d-flex' style={{ padding: 0, margin: 0 }}>
                    <p>{i._id}: </p>
                    <p> {i.number}</p>
                  </Card>
                ))}
              </ul>
            </Grid>
          )}
          <Grid container sm={12} className='pt-4 ' alignItems='flex-start'>
            {isLoading && (
              <Grid container justify='center'>
                <h4 style={{ color: "lightgrey" }}>
                  No clips, try changing the filters to find some techniques
                </h4>
              </Grid>
            )}

            {isOpen &&
              data[1].map(match => {
                console.log(match);
                return (
                  <Card
                    className='p-2'
                    style={{ width: "20%", height: "330px" }}
                    onClick={() => {}}
                  >
                    <img
                      style={{ width: "100%" }}
                      src={`https://img.youtube.com/vi/${youtubeVideoId(
                        match.url
                      )}/0.jpg`}
                    ></img>
                    {/* "                    can try tochange so use img instead */}
                    <VideoModal
                      link={`${match.url}?t=${match.takedowns.videoTime}`}
                    />
                    <p>
                      {match.takedowns.name}: {match.takedowns.takedown}
                      {/* <p> {match.setup.map(setup => setup)}</p> */}
                    </p>
                    Points: {match.takedowns.points}
                    <p>
                      {" "}
                      {match.takedowns.round === "round1"
                        ? "Round 1"
                        : "Round 2"}{" "}
                      Time: {timeFormatter(match.takedowns.time)}
                    </p>
                    <p></p>
                    {/* <p></p>
                    <p></p> */}
                    <p>{match.takedowns.weightclass}</p>
                  </Card>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
      <h5>Matches</h5>
      <Grid container direction='row'></Grid>
      <Grid>
        {isLoading ? <CircularProgress /> : <DataTable info={matchInfo} />}
      </Grid>
    </Grid>
  );
};

export default WrestlerProfile;
