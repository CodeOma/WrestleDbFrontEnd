import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import GraphBar from "../../components/Stats/GraphBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button, Card } from "@material-ui/core";
import axios from "axios";
import VideoModal from "../../components/components/VideoModal";
import DataTable from "../../components/components/Table";
import Stacked from "../../components/Stats/Stacked";
import { individualProfileStats } from "../../controllers/controller";
import { timeFormatter, youtubeVideoId } from "../../helpers/formatting";
import AutoComplete from "../Autocomplete";
import { AutocompleteWrestler } from "../../controllers/search";
import { getMatchByWrestlerId } from "../../controllers/controller";
import { Link, useParams } from "react-router-dom";

// const styles = {
//   graph:{

//   }
// }
// These labels appear in the legend and in the tooltips when hovering different arcs
const WrestlerProfile = () => {
  const { wrestler_id } = useParams();

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
  const [wrestlerId, setWrestlerId] = useState("");
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
        display: false,
        rtl: true,
        labels: {
          fontColor: "#333",
        },
      },
      onClick: (e, item) => {
        try {
          const index = item[0]?._index;
          const obj =
            item[0]?._chart?.config?.data?.datasets[0].yeet[0][0][index];
          // console.log(item[0]?._chart?.config?.data?.datasets[0].yeet[0][0]);

          if (obj) {
            setGraphDataList(
              item[0]?._chart?.config?.data?.datasets[0].yeet[0][0]
            );
            setData(Object.values(obj));
            setIsOpen(true);
          }
        } catch (e) {
          console.log(e);
        }
      },
    },
  });
  const [tdcData, setTdcData] = useState({
    type: "pie",
    title: "Points Given Up",
    data: [],
    labels: [],
    options: {
      legend: {
        display: false,
        rtl: true,
        labels: {
          fontColor: "#333",
        },
      },
      onClick: (e, item) => {
        try {
          const index = item[0]?._index;
          const obj =
            item[0]?._chart?.config?.data?.datasets[0].yeet[0][0][index];
          // console.log(item[0]?._chart?.config?.data?.datasets[0].yeet[0][0]);

          if (obj) {
            setGraphDataList(
              item[0]?._chart?.config?.data?.datasets[0].yeet[0][0]
            );
            setData(Object.values(obj));
            setIsOpen(true);
          }
        } catch (e) {
          console.log(e);
        }
      },
    },
  });
  const [counteredData, setCounteredData] = useState({
    type: "pie",
    title: "Countered",
    data: [],
    labels: [],
    options: {
      legend: {
        display: false,
        rtl: true,
        labels: {
          fontColor: "#333",
        },
      },
      onClick: (e, item) => {
        try {
          const index = item[0]?._index;
          const obj =
            item[0]?._chart?.config?.data?.datasets[0].yeet[0][0][index];
          // console.log(item[0]?._chart?.config?.data?.datasets[0].yeet[0][0]);

          if (obj) {
            setGraphDataList(
              item[0]?._chart?.config?.data?.datasets[0].yeet[0][0]
            );
            setData(Object.values(obj));
            console.log(data);
            setIsOpen(true);
          }
        } catch (e) {
          console.log(e);
        }
      },
    },
  });
  const [scData, setScData] = useState({
    data: [],
    labels: [],
    options: {
      onClick: (e, item) => {
        try {
          const index = item[0]?._index;
          const obj =
            item[0]?._chart?.config?.data?.datasets[1].yeet[0][0][index];
          // console.log(item[0]?._chart?.config?.data?.datasets[0].yeet[0][0]);
          console.log(obj);
          if (obj) {
            setGraphDataList(
              item[0]?._chart?.config?.data?.datasets[0].yeet[0][0]
            );
            console.log(Object.values(obj));

            setData(Object.values(obj));
            setIsOpen(true);
          }
        } catch (e) {
          // console.log(e);
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
      legend: {
        display: false,
        rtl: true,
        labels: {
          fontColor: "#333",
        },
      },
      onClick: (e, item) => {
        try {
          const index = item[0]?._index;
          const obj =
            item[0]?._chart?.config?.data?.datasets[0].yeet[0][0][index];
          // console.log(item[0]?._chart?.config?.data?.datasets[0].yeet[0][0]);

          if (obj) {
            setGraphDataList(
              item[0]?._chart?.config?.data?.datasets[0].yeet[0][0]
            );
            setData(Object.values(obj));
            setIsOpen(true);
          }
        } catch (e) {
          console.log(e);
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
  const [setupData, setSetupData] = useState({
    type: "pie",
    title: "Tags/Setups",
    data: [],
    labels: [],
    options: {
      legend: {
        display: false,
      },
      onClick: (e, item) => {
        try {
          const index = item[0]?._index;
          const obj =
            item[0]?._chart?.config?.data?.datasets[0].yeet[0][0][index];
          // console.log(item[0]?._chart?.config?.data?.datasets[0].yeet[0][0]);

          if (obj) {
            setGraphDataList(
              item[0]?._chart?.config?.data?.datasets[0].yeet[0][0]
            );
            setData(Object.values(obj));
            setIsOpen(true);
          }
        } catch (e) {
          console.log(e);
        }
      },
    },
  });
  const [oppSetupData, setOppSetupData] = useState({
    type: "pie",
    title: "Tags/Setups on Td's Conceded",
    data: [],
    labels: [],
    options: {
      legend: {
        display: false,
      },
      onClick: (e, item) => {
        try {
          const index = item[0]?._index;
          const obj =
            item[0]?._chart?.config?.data?.datasets[0].yeet[0][0][index];
          // console.log(item[0]?._chart?.config?.data?.datasets[0].yeet[0][0]);

          if (obj) {
            setGraphDataList(
              item[0]?._chart?.config?.data?.datasets[0].yeet[0][0]
            );
            setData(Object.values(obj));
            setIsOpen(true);
          }
        } catch (e) {
          console.log(e);
        }
      },
    },
  });
  const matches = array => {
    console.log("array", array);
    const rows = array.map((field, i) => {
      return {
        id: i,
        url: field.url,
        ...field,
        ...field.result,
        ...field.tournament,
      };
    });
    // const columns = Object.keys(array[0]).map(k => {
    //   return { field: k, headerName: k, width: 160 };
    // });
    const columns = [
      {
        field: "tournamentName",
        headerName: "Tournament",
        width: 300,
      },
      { field: "round", headerName: "Round", width: 160 },

      { field: "winner", headerName: "Winner", width: 200 },
      { field: "loser", headerName: "Loser", width: 200 },
      { field: "weightClass", headerName: "Weight Class", width: 160 },

      // { field: "url", headerName: "Video", width: 300 },
    ];
    setMatchInfo({
      ...matchInfo,
      columns,
      rows,
      // array: [array],
    });
  };
  useEffect(() => {
    setWrestlerId(wrestler_id);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetch = await individualProfileStats(wrestlerId);

        const data = await fetch.data;

        // const data2 = await fetch[1].data;
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
        console.log(data[7]);

        // setProfileData(data2);
        // setTdData(data2);
        const initGraph = (array, fn, currData) => {
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
        const prep = (array, fn, currData) => {
          const obj = {
            data: [],
            labels: [],
          };
          const obj2 = {
            data: [],
            labels: [],
          };
          array.forEach(t => {
            console.log(t.c.length);
            obj.labels.push(t._id ? t._id : "Other");
            obj.data.push(t.sc.length);
          });
          array.forEach(t => {
            obj2.labels.push(t._id ? t._id : "Other");
            obj2.data.push(t.c.length);
          });
          // const array1 = [
          //   array.map(r => {
          //     return { _id: r._id, scored: "scored", takedowns: r.sc };
          //   }),
          // ];
          // const array2 = [
          //   array.map(r => {
          //     return { _id: r._id, scored: "countered", takedowns: r.c };
          //   }),
          // ];
          // const [a1] = array1;
          // const [a2] = array2;
          fn({
            ...currData,
            labels: obj.labels,
            data1: obj.data,
            data2: obj2.data,

            // array1,
            // array2,
            array: [
              array.map(td => {
                return { _id: td._id, takedowns: [...td.c, ...td.sc] };
              }),
            ],
          });
        };

        const fetchMatches = await getMatchByWrestlerId(wrestlerId);
        console.log(fetchMatches);
        matches(fetchMatches.data);
        console.log(data[7]);

        prep(data[7], setScData, scData);
        initGraph(data[1], setTdcData, tdcData);
        initGraph(data[2], setTdData, tdData);
        initGraph(data[3], setCounteredData, counteredData);
        initGraph(data[4], setScoreType, scoreType);
        initGraph(data[5], setSetupData, setupData);
        initGraph(data[6], setOppSetupData, oppSetupData);

        // setWrestler(data.wrestler[0].fullName);
        setIsLoading(false);
        setIsOpen(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [wrestlerId]);
  useEffect(() => {}, [isOpen]);
  const styles = {
    root: {
      // backgroundColor: "#f1f0f7",

      p: {
        fontSize: "10",
      },
    },
    $p: {
      fontSize: "10",
    },
  };
  return (
    <Grid style={styles.root}>
      <Grid
        container
        xs={12}
        direction='row'
        justify='space-between'
        style={{
          background: "#1d2a3c",
          boxShadow: "0 8px 5px -8px rgba(148, 148, 148, 1)",
        }}
        className='p-4'
      >
        <h2 className='pt-4 pl-4' style={{ color: "white" }}>
          {wrestlerStats.fullName}
        </h2>
      </Grid>{" "}
      <Grid
        container
        xs={12}
        className='p-1 px-3'
        style={{ backgroundColor: "#4f72a4" }}
      >
        <AutoComplete
          searchFunction={AutocompleteWrestler}
          setFunction={setWrestlerId}
          label='Wrestler'
          value={wrestlerId}
        />
      </Grid>
      <Grid container xs={12} className='m-2 p-2' direction='row'>
        <Grid
          container
          className='mt-2 pt-4'
          alignItems='flex-start'
          direction='row'
          justify='flex-start'
          alignContent='flex-start'
          xs={3}
          sm={3}
          style={{ background: "#3c6089", borderRadius: "10px", width: "100%" }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <ul
              style={{
                listStyle: "none",
                color: "white",
                padding: 0,
                fontSize: ".8rem",
              }}
              className='p-1'
            >
              <h6>Matches:</h6>
              <li className='pl-2'>Wins: {wrestlerStats.wins}</li>
              <li className='pl-2'>Losses: {wrestlerStats.losses}</li>
              <li className='pl-2'>
                Win Percentage: {wrestlerStats.winPercentage}
              </li>
              <li className='pl-2'>
                Total Matches:{wrestlerStats.totalMatches}
              </li>
              <h6>Scores:</h6>
              <li className='pl-2'>
                Total Points Conceded: {wrestlerStats.totalPC}
              </li>
              <li className='pl-2'>
                Total Points Scored:{wrestlerStats.totalPS}
              </li>
              <li className='pl-2'>
                Average Points Conceded: {wrestlerStats.avgPCPM}
              </li>
              <li className='pl-2'>
                Average Points Scored:{wrestlerStats.avgPSPM}
              </li>
              <li className='pl-2'>
                Matches Score First: {wrestlerStats.matchesScoreFirst}
              </li>
              <li className='pl-2'>
                Matches Score Last: {wrestlerStats.matchesScoreLast}
              </li>
              <li className='pl-2'>
                Point Scored/Conceded: {wrestlerStats.pspcRatio}
              </li>
              <li className='pl-2'>
                Score First (%): {wrestlerStats.scoreFirstPerc}
              </li>
              {/* <li>Opponents Beat: {wrestlerStats.opponentsBeat}</li> */}
              {/* <li>opponentsLostTo: {wrestlerStats.opponentsLostTo}</li> */}
              <li className='pl-2'>
                Score Last (%): {wrestlerStats.scorelastPerc}
              </li>
            </ul>
          )}
        </Grid>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid
            container
            alignItems='flex-start'
            direction='row'
            // justify='center'
            // alignContent='center'
            xs={9}
          >
            <Grid container xs={12}>
              <Grid className='pt-3' item xs={11} sm={4}>
                <Card className='p-4 m-2'>
                  {" "}
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <>
                      <h6>Score Type</h6>

                      <GraphBar tableData={scoreType} />
                    </>
                  )}
                </Card>
              </Grid>

              <Grid container xs={12} sm={4}>
                <Card className='p-4 m-2'>
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
                </Card>
              </Grid>
              <Grid
                container
                xs={12}
                sm={4}
                style={{ height: "auto", width: "auto" }}
              >
                <Card className='p-4 m-2'>
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
                </Card>
              </Grid>
              <Grid container xs={12} sm={4}>
                <Card className='p-4 m-2'>
                  <h6> Tags/Setups</h6>
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <GraphBar
                      setIsOpen={setIsOpen}
                      setData={setData}
                      tableData={setupData}
                    />
                  )}
                </Card>
              </Grid>
              <Grid container xs={12} sm={4}>
                <Card className='p-4 m-2'>
                  <h6> Countered</h6>
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <GraphBar
                      setIsOpen={setIsOpen}
                      setData={setData}
                      tableData={counteredData}
                    />
                  )}
                </Card>
              </Grid>
              <Grid container xs={12} sm={4}>
                <Card className='p-4 m-2'>
                  <h6> Tags/Setups on points given up</h6>
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <GraphBar
                      setIsOpen={setIsOpen}
                      setData={setData}
                      tableData={oppSetupData}
                    />
                  )}
                </Card>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid className='px-2' direction='row' container xs={12}>
        {/* <h5> Videos</h5> */}
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
        <Grid container sm={12} className='p-4 m-4' alignItems='flex-start'>
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
                <Grid xs={4} sm={2}>
                  <Card className='p-2'>
                    {/* "                    can try tochange so use img instead */}
                    <VideoModal
                      type='img'
                      link={
                        match.videoTime
                          ? `${match.url}?t=${match.takedowns.videoTime}`
                          : match.url
                      }
                    />
                    {match.takedowns?.countered &&
                    Boolean(match?.takedowns.countered) === "true" ? (
                      <p>Given up</p>
                    ) : match.takedowns?.countered ? (
                      <p>Scored</p>
                    ) : (
                      <></>
                    )}
                    <p>
                      {match.takedowns.takedown}
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
                </Grid>
              );
            })}
        </Grid>
      </Grid>
      <Grid container xs={12} justify='flex-end' className='p-2'>
        <Grid container xs={4} sm={4}>
          <Card className='p-4 m-2'>
            {/* <h6> </h6> */}
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Stacked
                setIsOpen={setIsOpen}
                setData={setData}
                tableData={scData}
              />
            )}
          </Card>
        </Grid>{" "}
        <Grid container xs={8} style={{ backgroundColor: "white" }}>
          {isLoading ? <CircularProgress /> : <DataTable info={matchInfo} />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WrestlerProfile;
