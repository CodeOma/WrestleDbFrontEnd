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
import AutoComplete from "../../../components/Create/AutoCompleteInput";

import {
  userCreateTournament,
  userUpdateTournament,
  userDeleteTournament,
  userFetchTournament,
} from "../../../controllers/manage/tournament.js";
import { getTournamentByUser } from "../../../controllers/manage/getbyuser.js";
import RefreshIcon from "@material-ui/icons/Refresh";

const Tournament = () => {
  const [isLoading, setisLoading] = useState(false);
  const [tournamentList, setTournamentList] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [mode, setMode] = useState("list");
  const [tournament, setTournament] = useState({
    name: "",
    year: "",
    type: "",

    location: {
      city: "",
      country: "",
    },
  });
  const [isEdit, setIsEdit] = useState(false);
  const onSelectorChange = () => {};
  const handleSubmit = async () => {
    try {
      console.log(tournament);
      if (isEdit) {
        if (tournament.name.length !== 0) {
          userUpdateTournament(tournament);
          setTournament({
            name: "",
            year: "",
            type: "",

            location: {
              city: "",
              country: "",
            },
            owner: "",
          });
        }
      } else {
        if (tournament.name.length !== 0) {
          userCreateTournament({
            name: tournament.name,
            year: tournament.year,
            type: tournament.type,

            location: {
              city: tournament.location.city,
              country: tournament.location.country,
            },
          });
          setTournament({
            name: "",
            year: "",
            type: "",

            location: {
              city: "",
              country: "",
            },
            owner: "",
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const fetch = async () => {
    try {
      // setIsLoading(true);
      const data = await userFetchTournament();
      await setTournamentList(data.data);
      // setIsLoading(false);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetch();
  }, [refresh]);

  return (
    <div>
      {" "}
      <h3 id='form-dialog-title'> Tournament </h3>
      <Grid aria-labelledby='form-dialog-title'>
        <Grid container direction='row'>
          <Grid xs={6} sm={5} className='p-4'>
            <Card>
              <input />
              <Button onClick={() => fetch()}>
                <RefreshIcon />
              </Button>
              {isLoading ? (
                <h6>Loading</h6>
              ) : (
                <ul
                  className='pt-2'
                  style={{
                    listStyle: "none",
                    maxHeight: "50%",
                    overflow: "scroll",
                  }}
                >
                  {tournamentList.map(tournament => (
                    <li>
                      {`${tournament.name} ${tournament.year}`}
                      <EditIcon
                        fontSize='inherit'
                        onClick={() => {
                          setTournament(tournament);
                          setIsEdit(true);
                        }}
                      />
                      <DeleteIcon
                        fontSize='inherit'
                        onClick={() => {
                          console.log(tournament);
                          setRefresh(!refresh);

                          // showDeleteModal(tournament._id);
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </Grid>
          <Grid xs={6} sm={7}>
            {/* <Grid container direction='row'>
              <Button onClick={() => setMode("create")}>Create New</Button>
              <Button onClick={() => setMode("list")}>List</Button>
            </Grid> */}
            <Card>
              <Grid className='pb-4' xs={12} justify='center' container>
                {/* <input placeholder='Year'></input> */}
                <Grid className='p-4' direction='column' container>
                  <h6>Tournament:</h6>
                  <TextField
                    id='outlined-helperText'
                    label=' '
                    value={tournament.name}
                    onChange={e =>
                      setTournament({ ...tournament, name: e.target.value })
                    }
                    helperText='Tournament Name'
                  />{" "}
                  <TextField
                    id='outlined-helperText'
                    label=' '
                    value={tournament.year}
                    onChange={e =>
                      setTournament({ ...tournament, year: e.target.value })
                    }
                    helperText='Year'
                  />{" "}
                  <TextField
                    id='outlined-helperText'
                    label=' '
                    value={tournament.type}
                    onChange={e =>
                      setTournament({ ...tournament, type: e.target.value })
                    }
                    helperText='Type'
                  />{" "}
                  <TextField
                    id='outlined-helperText'
                    label=' '
                    value={tournament.location.country}
                    onChange={e =>
                      setTournament({
                        ...tournament,
                        location: {
                          ...tournament.location,
                          country: e.target.value,
                        },
                      })
                    }
                    helperText='Country'
                  />
                  <TextField
                    id='outlined-helperText'
                    label=' '
                    value={tournament.location.city}
                    onChange={e =>
                      setTournament({
                        ...tournament,
                        location: {
                          ...tournament.location,
                          city: e.target.value,
                        },
                      })
                    }
                    helperText='City'
                  />
                  <br />
                </Grid>
                <Grid direction='row' container justify='center'>
                  {isEdit ? (
                    <>
                      <Button
                        onClick={() => {
                          handleSubmit();
                          setIsEdit(false);
                        }}
                        style={{ marginTop: "20px" }}
                      >
                        Save Edit{" "}
                      </Button>
                      <Button
                        onClick={() => {
                          userDeleteTournament(tournament);
                          setRefresh(!refresh);
                          setIsEdit(false);
                          setTournament({
                            name: "",
                            year: "",
                            type: "",

                            location: {
                              city: "",
                              country: "",
                            },
                            owner: "",
                          });
                        }}
                        style={{ marginTop: "20px" }}
                      >
                        Delete{" "}
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        handleSubmit();
                      }}
                      style={{ marginTop: "20px" }}
                    >
                      Create Tournament{" "}
                    </Button>
                  )}
                </Grid>{" "}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Tournament;
