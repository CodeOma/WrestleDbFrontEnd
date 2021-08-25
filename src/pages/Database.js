import React, { Component, useState, useEffect } from "react";
import {
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Card,
  Button,
} from "@material-ui/core";
import VideoModal from "../components/components/VideoModal";
import VideoModal2 from "../components/components/VideoModal2";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import axios from "axios";
import Checkbox, { CheckboxDef } from "../components/components/Checkbox";
import {
  getMatchByWrestler,
  getMatchByTeam,
  getMatchByTournament,
} from "../controllers/controller";
import {
  AutocompleteMatch,
  AutocompleteWrestler,
  AutocompleteTournament,
  AutocompleteTeam,
} from "../controllers/search";
import { youtubeVideoId } from "../helpers/formatting";
// import { useGlobalContext } from "../context/context";

const Selector = ({ options, label, onOptChange, valu }) => {
  const styles = {
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: "1",
    },
  };
  const [opt, setOpt] = useState("");
  useEffect(() => {
    setOpt("Wrestlers");
  }, []);
  return (
    <FormControl style={styles.formControl}>
      <NativeSelect
        value={opt}
        onChange={e => {
          setOpt(e.target.value);

          onOptChange(e.target.value);
          // setOpt("");
        }}
        className={styles.selectEmpty}
        inputProps={{ "aria-label": "age" }}
      >
        <option value=''> </option>
        {options.map(opt => {
          return <option value={opt}>{opt}</option>;
        })}
      </NativeSelect>
      <FormHelperText>{label}</FormHelperText>
    </FormControl>
  );
};

const Database = () => {
  // const { tournaments } = useGlobalContext();
  const [data, setData] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const [wrestName, setWrestName] = useState();
  const [fetchedData, setFetchedData] = useState([]);
  const [searchTopic, setSearchTopic] = useState("Wrestlers");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [view, setView] = useState("tournaments");
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(0);
  ///filters///
  const [filterOptions, setFilterOptions] = useState({
    weightClass: [],
    teams: [],
    opponent: [],
    winLoss: [],
    round: [],
    tournament: [],
    result: [],
  });
  const [selectedFilters, setSelectedFilters] = useState({
    weightClass: [],
    teams: [],
    opponent: [],
    winLoss: [],
    round: [],
    tournament: [],
    result: [],
  });

  //End of filters////

  const [query, setQuery] = useState("http://localhost:5000/tournament");
  const handleClick = id => {
    // setView("matches");
    setQuery(`http://localhost:5000/match/tournament/${id}`);
  };

  const randomWrest = [
    "60611a6ca482a996c290d38a",
    "6042f3738e4ff31a532f749e",
    "6042f2898e4ff31a532f717c",
  ];
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const fetch = await getMatchByWrestler(
          "60611a6ca482a996c290d38a",
          selectedFilters,
          page
        );
        setFetchedData(fetch.data.matches);
        setFilterOptions(fetch.data.filters);
        setWrestName(fetch.data.matches[0]?.teamName);
      } catch (e) {
        console.log(e);
      }
    };

    fetchInfo();
  }, []);

  useEffect(() => {
    const set = async () => {
      if (searchTopic === "Teams") {
        const sett = await AutocompleteTeam(search);
        setSuggestion(sett);
      } else if (searchTopic === "Tournaments") {
        const sett = await AutocompleteTournament(search);
        setSuggestion(sett);
      } else {
        const sett = await AutocompleteWrestler(search);
        setSuggestion(sett);
      }
    };
    set();
  }, [search]);
  useEffect(() => {
    setSearch("");
  }, [searchTopic]);
  const renderResults = () => {
    try {
      if (suggestion.length === 0) {
        return null;
      }
      return (
        isOpen && (
          <Grid className='px-1'>
            <p className='d-flex flex-row'>
              <i>results:</i>
            </p>
            <ul
              className='justify-content-center'
              style={{ listStyleType: "none", paddingLeft: 0, border: "1px" }}
            >
              {suggestion.map(item => (
                <li
                  style={{ fontSize: "14px", cursor: "pointer" }}
                  onClick={() => {
                    setData(item.id);
                    setSearch(item.title);
                    setIsOpen(false);
                    console.log(data);
                  }}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </Grid>
        )
      );
    } catch (error) {}
  };

  useEffect(() => {
    const fetchInfo = async getFunc => {
      const fetch = await getFunc(data, selectedFilters, page);
      setFetchedData(fetch.data.matches);
      setFilterOptions(fetch.data.filters);
      setWrestName(fetch.data.matches[0]?.teamName);
    };
    const getData = async () => {
      try {
        if (searchTopic === "Teams") {
          fetchInfo(getMatchByTeam);
        } else if (searchTopic === "Tournaments") {
          fetchInfo(getMatchByTournament);
        } else {
          fetchInfo(getMatchByWrestler);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, [data, selectedFilters, page]);

  return (
    <Grid container>
      <Grid
        container
        xs={12}
        direction='row'
        justify='space-between'
        style={{
          background: "#1d2a3c",
          boxShadow: "0 8px 5px -8px rgba(148, 148, 148, 1)",
        }}
        className='p-4 section-text'
      >
        <h2 className='pt-4 pl-4' style={{ color: "white" }}>
          Matches
        </h2>
      </Grid>
      <Grid className='m-2 mx-3' style={{ backgroundColor: "white" }}>
        <Grid
          // className='ml-4 mr-4'
          container
          justify='center'
          alignItems='flex-start'
          direction='row'
        >
          <Grid direction='column' sm={3} container>
            <Grid
              direction='column'
              className='d-flex'
              container
              className='pl-3 pr-4 pt-2'
            >
              <Grid className='pt-4'>
                <Selector
                  valu={searchTopic}
                  onOptChange={setSearchTopic}
                  options={["Wrestlers", "Teams", "Tournaments"]}
                  label={"Search"}
                />
                <div>
                  <input
                    value={search}
                    placeholder={`Search by ${searchTopic}`}
                    onChange={e => {
                      setSearch(e.target.value);
                      setIsOpen(true);
                    }}
                    style={{
                      padding: "5px",

                      marginTop: "10px",
                      width: "100%",
                    }}
                  />
                  {renderResults()}
                </div>
                {/* <Selector options={[""]} label={"Weight Class"} /> */}
              </Grid>

              <Grid className='pt-4'>
                {searchTopic !== "Tournaments" && (
                  <Checkbox
                    wrestName={wrestName}
                    name='tournament'
                    label='Tournament'
                    data={filterOptions.tournament}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                  />
                )}
                <Checkbox
                  wrestName={wrestName}
                  label='Weight Class'
                  name='weightClass'
                  selectedFilters={selectedFilters}
                  data={filterOptions.weightClass}
                  setSelectedFilters={setSelectedFilters}
                />
                <Checkbox
                  wrestName={wrestName}
                  name='round'
                  label='Round'
                  data={filterOptions.round}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                />
                {searchTopic !== "Tournaments" && (
                  <>
                    <Checkbox
                      wrestName={wrestName}
                      label='Opponent'
                      name='opponent'
                      data={filterOptions.opponent}
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                    />
                    <Checkbox
                      wrestName={wrestName}
                      label='Win/Loss'
                      name='winLoss'
                      data={filterOptions.winLoss}
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                    />
                  </>
                )}
                <Checkbox
                  wrestName={wrestName}
                  name='result'
                  label='Result'
                  data={filterOptions.result}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                />
              </Grid>

              <Grid />
            </Grid>
          </Grid>

          <Grid container sm={9}>
            <Grid
              container
              sm={12}
              className='pt-3 px-1'
              alignItems='flex-start'
            >
              {!fetchedData.length && (
                <Grid container justify='center'>
                  <h4 style={{ color: "lightgrey" }}>No matches use Search</h4>
                </Grid>
              )}

              {fetchedData &&
                fetchedData.length >= 1 &&
                fetchedData.map(match => {
                  return (
                    <Grid
                      container
                      xs={6}
                      sm={4}
                      md={3}
                      style={{ height: "21rem" }}
                    >
                      <Card className='p-2 m-1'>
                        <VideoModal2
                          matchId={match._id}
                          techniqueTime={match.videoTime}
                          type='img'
                          link={`${match.url}?t=${match.videoTime}`}
                        />{" "}
                        <p>
                          {match.result.winner} {match.result.victoryType}{" "}
                          {match.result.loser}{" "}
                          {match.result.winner === match.wrestler.fullName
                            ? match?.wrestTotals || 0
                            : match?.oppTotals || 0}
                          -
                          {match.result.loser === match.wrestler.fullName
                            ? match?.wrestTotals || 0
                            : match?.oppTotals || 0}
                        </p>
                        <p>
                          {match.tournamentName}: {match.round}
                        </p>
                        <p></p>
                        <p>{match.weightclass}</p>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
            {page > 0 && (
              <Button
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                Prev
              </Button>
            )}
            {fetchedData && fetchedData.length > 19 && (
              <Button
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Next
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>{" "}
    </Grid>
  );
};

export default Database;
