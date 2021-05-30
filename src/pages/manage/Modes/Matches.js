import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  FormHelperText,
  Card,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "../../../components/Create/Selector";
import { useAuth } from "../../../context/AuthContext";
import { getUserMatchByWrestler } from "../../../controllers/manage/match";
import {
  userUpdateMatch,
  userCreateMatch,
  userFetchMatch,
} from "../../../controllers/manage/match.js";
import {
  userAutocompleteWrestler,
  userAutocompleteTournament,
  userAutocompleteTeam,
} from "../../../controllers/manage/usersearch";

import RefreshIcon from "@material-ui/icons/Refresh";
import Alert from "../../../components/components/Alert";
import Autocomplete from "../../Autocomplete";
const Matches = () => {
  const { currentUser } = useAuth();
  const handleSubmit = () => {};
  const [mode, setMode] = useState("list");
  const [isEdit, setIsEdit] = useState(false);
  const [match, setMatch] = useState({
    tournament: "",

    style: "",
    weightClass: "",
    round: "",
    result: {
      winner: "",
      loser: "",
      victoryType: "",
    },
    redWrestler: {
      id: "",

      team: "",
    },
    blueWrestler: {
      id: "",

      team: "",
    },

    url: "",

    scores: [],
    owner: "",
    private: true,
    organization: "",
  });
  const [matchList, setMatchList] = useState([]);

  const [wrestler, setWrestler] = useState({});
  const [tournament, setTournament] = useState("");

  const [tab, setTab] = useState("wrestler");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [refresh, setRefresh] = useState(false);
  const onSelectorChange = () => {};
  useEffect(() => {
    getUserMatchByWrestler();
  }, []);

  const fetch = async () => {
    try {
      // setIsLoading(true);
      const data = await userFetchMatch();
      await setMatchList(data.data.slice(0, 10));
      console.log(data);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => setError(""), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);
  useEffect(() => {
    const timer = setTimeout(() => setSuccess(""), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [success]);
  useEffect(() => {
    // fetch();
    // const fetchType = async () => {
    //   const fetchedType = await userFetchType();
    //   const newArray = fetchedType.data.map(type => {
    //     return { title: type.type, id: type._id };
    //   });
    //   setTypeOptions(newArray);
    // };
    // fetchType();
    // const fetchPosition = async () => {
    //   const fetchedPosition = await userFetchPosition();
    //   const newArray = fetchedPosition.data.map(position => {
    //     return { title: position.position, id: position._id };
    //   });
    //   setPositionOptions(newArray);
    // };
    // fetchPosition();
  }, [refresh]);

  useEffect(() => {
    fetch();
  }, [refresh]);
  return (
    <div>
      <Grid aria-labelledby='form-dialog-title'>
        <h3 id='form-dialog-title'> Matches </h3>

        <Grid container direction='row'>
          <Grid xs={6} sm={5} className='p-4'>
            <Card>
              <input />
              <ul
                className='pt-2 pl-4 pr-2'
                style={{
                  listStyle: "none",
                  overflow: "scroll",
                }}
              >
                {matchList.map(match => (
                  <li>
                    {`${match.result.winner} ${match.result.victoryType} ${match.result.loser} ${match.weightClass}kg`}{" "}
                    <EditIcon
                      fontSize='inherit'
                      onClick={() => {
                        setMatch(match);
                        setIsEdit(true);
                      }}
                    />
                    <DeleteIcon
                      fontSize='inherit'
                      onClick={() => {
                        setRefresh(!refresh);
                      }}
                    />
                  </li>
                ))}
              </ul>{" "}
            </Card>
          </Grid>

          <Grid xs={6} sm={7}>
            <Card>
              {error && (
                <Alert title='Error' severity='error' message={error} />
              )}
              {success && (
                <Alert title='Success' severity='success' message={success} />
              )}
              <Button
                onClick={() => {
                  setTab("tournament");
                  console.log(error);
                }}
              >
                Tournament
              </Button>
              <Button onClick={() => setTab("wrestlers")}>Wrestlers</Button>
              {tab === "tournament" ? (
                <Grid className='p-4' direction='column' container>
                  <h6>Match Info:</h6>
                  <Autocomplete
                    value={match.tournament}
                    setFunction={setMatch}
                    name='tournament'
                    label='Tournament'
                    searchFunction={userAutocompleteTournament}
                  />

                  <Select
                    state={match}
                    fn={setMatch}
                    name={"round"}
                    onChange={onSelectorChange}
                    options={[
                      "Qualification",
                      "1/16",
                      "1/8",
                      "Quarter-Final",
                      "Semi-Final",
                      "Final",
                      "Other",
                    ]}
                    label={"Round"}
                  />
                  <Select
                    state={match}
                    fn={setMatch}
                    name={"weightClass"}
                    onChange={onSelectorChange}
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
                </Grid>
              ) : (
                <Grid className='pb-4' xs={12} justify='center' container>
                  {/* <input placeholder='Year'></input> */}
                  <Grid className='p-4' direction='column' container>
                    <h6>Wrestlers:</h6>

                    <Autocomplete
                      value={match.redWrestler.id}
                      setFunction={setMatch}
                      name='redWrestler.id'
                      label='Red Wrestler'
                      searchFunction={userAutocompleteWrestler}
                    />
                    <Autocomplete
                      value={match.redWrestler.team}
                      setFunction={setMatch}
                      name='redWrestler.team'
                      label='Red Wrestler Team'
                      searchFunction={userAutocompleteTeam}
                    />
                    <br />
                    <Autocomplete
                      value={match.blueWrestler.id}
                      setFunction={setMatch}
                      name='blueWrestler.id'
                      label='Blue Wrestler'
                      searchFunction={userAutocompleteWrestler}
                    />
                    <Autocomplete
                      value={match.blueWrestler.team}
                      setFunction={setMatch}
                      name='blueWrestler.team'
                      label='Blue Wrestler Team'
                      searchFunction={userAutocompleteTeam}
                    />
                  </Grid>
                  <Grid direction='row' container justify='center'>
                    <Grid container direction='column' className='w-50'>
                      <TextField
                        margin='dense'
                        id='name'
                        value={"newTournament.year"}
                        onChange={e =>
                          setMatch({
                            ...match,
                            url: e.target.value,
                          })
                        }
                        label='Video Url'
                        type='text'
                      >
                        Video Url:
                      </TextField>
                      <FormHelperText>Video Url</FormHelperText>
                    </Grid>
                    <Button
                      onClick={() => {
                        //   console.log(wrestler);
                        console.log(match);
                      }}
                      style={{ marginTop: "20px" }}
                    >
                      Set Match Info
                    </Button>
                  </Grid>{" "}
                </Grid>
              )}
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Matches;
