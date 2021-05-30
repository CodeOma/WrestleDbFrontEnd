import React, { Component, useState, useEffect } from "react";
import {
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Card,
  Button,
} from "@material-ui/core";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import axios from "axios";
import Checkbox, { CheckboxDef } from "../components/components/Checkbox";
import {
  getMatchByWrestler,
  getMatchByTeam,
  getMatchByTournament,
  getAllTechniques,
} from "../controllers/controller";
import VideoModal from "../components/components/VideoModal";
import {
  AutocompleteMatch,
  AutocompleteWrestler,
  AutocompleteTournament,
  AutocompleteTeam,
} from "../controllers/search";
import { useAuth } from "../context/AuthContext";
import { youtubeVideoId, timeFormatter } from "../helpers/formatting";
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
  const { currentUser } = useAuth();

  ///filters///
  const [filterOptions, setFilterOptions] = useState({
    weightClass: [],
    offdef: [],
    position: [],
    type: [],
    round: [],
    setup: [],
    points: [],
    wrestler: [],
    takedown: [],
  });
  const [selectedFilters, setSelectedFilters] = useState({
    weightClass: [],
    offdef: [],
    position: [],
    type: [],
    round: [],
    setup: [],
    points: [],
    wrestler: [],
    takedown: [],
  });

  //End of filters////

  const [query, setQuery] = useState("http://localhost:5000/tournament");
  const handleClick = id => {
    // setView("matches");
    setQuery(`http://localhost:5000/match/tournament/${id}`);
  };

  useEffect(() => {
    const set = async () => {
      if (searchTopic === "Technique") {
        const sett = await AutocompleteTeam(search);
        setSuggestion(sett);
      } else if (searchTopic === "Setup") {
        const sett = await AutocompleteTeam(search);
        setSuggestion(sett);
      } else {
        const sett = await AutocompleteWrestler(search);
        setSuggestion(sett);
      }
    };
    set();
  }, [search]);
  useEffect(() => {
    // const getData = async () => {
    //   const fetch = await getAllTechniques();
    //   console.log(fetch);
    // };
    // getData();
    // setSearch("");
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
    setPage(0);
    setIsLoaded(true);
  }, [wrestName]);
  useEffect(() => {
    const fetchInfo = async getFunc => {
      try {
        const fetch = await getAllTechniques(
          data,
          selectedFilters,
          page
          // 0,
          // token
        );

        // const fetch = await getFunc(data, selectedFilters, page);
        console.log(fetch);
        setFetchedData(fetch.data.matches);
        setFilterOptions(fetch.data.filters);
        // setWrestName(fetch.data.matches[0]?.teamName);
      } catch (e) {
        console.log(e);
      }
    };
    fetchInfo();
    // const getData = async () => {
    //   try {
    //     if (searchTopic === "Teams") {
    //       fetchInfo(getMatchByTeam);
    //     } else if (searchTopic === "Tournaments") {
    //       fetchInfo(getMatchByTournament);
    //     } else {
    //       fetchInfo(getMatchByWrestler);
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };

    // getData();
  }, [data, selectedFilters, page]);

  return (
    <Grid className='m-2 mx-5' style={{ backgroundColor: "white" }}>
      <Grid
        // className='px-3'
        container
        justify='center'
        alignItems='flex-start'
        direction='row'
      >
        <Grid direction='column' xs={6} sm={3} container>
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

            <Grid className='pt-4' style={{ width: "100%" }}>
              {/* {searchTopic !== "Tournaments" && (
                <Checkbox
                  wrestName={wrestName}
                  name='tournament'
                  label='Tournament'
                  data={filterOptions.tournament}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                />
              )} */}
              <Checkbox
                wrestName={wrestName}
                name='takedown'
                label='Takedown'
                data={filterOptions?.takedown}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
              <Checkbox
                wrestName={wrestName}
                name='setup'
                label='Tags/Setups'
                data={filterOptions.setup}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />

              <Checkbox
                wrestName={wrestName}
                name='offdef'
                label='Offensive/Defensive'
                data={filterOptions.offdef}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
              <Checkbox
                wrestName={wrestName}
                name='wrestler'
                label='Wrestler'
                data={filterOptions.wrestler}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
              <Checkbox
                wrestName={wrestName}
                name='position'
                label='Position'
                data={filterOptions.position}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
              <Checkbox
                wrestName={wrestName}
                name='type'
                label='Type'
                data={filterOptions.type}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />

              <Checkbox
                wrestName={wrestName}
                name='points'
                label='Points'
                data={filterOptions.points}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
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
            </Grid>

            <Grid />
          </Grid>
        </Grid>

        <Grid container xs={6} sm={9}>
          <h5 className='pt-3'>Techniqes</h5>

          <Grid container sm={12} className='pt-4' alignItems='flex-start'>
            {!isLoaded && (
              <Grid container justify='center'>
                <h4 style={{ color: "lightgrey" }}>
                  No clips, try changing the filters to find some techniques
                </h4>
              </Grid>
            )}

            {fetchedData &&
              fetchedData.map(match => {
                return (
                  <Card
                    className='p-2'
                    style={{
                      width: "33%",
                      height: "330px",
                    }}
                    onClick={() => {}}
                  >
                    <VideoModal
                      type='img'
                      link={`${match.url}?t=${match.videoTime}`}
                    />{" "}
                    <p style={{ fontSize: "0.8rem" }} className='mb-0'></p>
                    {match.wrestler}: {match.takedown}
                    <p style={{ fontSize: "0.8rem" }} className='mb-0'>
                      {" "}
                      {match.setup.map(setup => setup)}
                    </p>
                    <p style={{ fontSize: "0.8rem" }} className='mb-0'>
                      {" "}
                      {match.round === "round1" ? "Round 1" : "Round 2"}, Time:{" "}
                      {timeFormatter(match.time)}{" "}
                    </p>
                    <p style={{ fontSize: "0.8rem" }} className='mb-0'>
                      {match.type}
                    </p>
                    <p style={{ fontSize: "0.8rem" }}>
                      {" "}
                      {match.offdef} Points: {match.points}
                    </p>
                    {/* <p></p>
                    <p></p> */}
                    {/* <p style={{ fontSize: "0.5rem" }} className='mb-0'>
                      {match.weightclass}
                    </p> */}
                  </Card>
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
    </Grid>
  );
};

export default Database;
