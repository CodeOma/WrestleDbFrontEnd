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
import Selector from "../../../pages/Selector";

import {
  userCreateTournament,
  userUpdateTournament,
  userDeleteTournament,
  userFetchTournament,
} from "../../../controllers/manage/tournament.js";
import { getTournamentByUser } from "../../../controllers/manage/getbyuser.js";
import RefreshIcon from "@material-ui/icons/Refresh";
import Alert from "../../../components/components/Alert";
import DeleteModal from "../../../components/components/DeleteModal";

const Tournament = () => {
  const [isLoading, setisLoading] = useState(false);
  const [tournamentList, setTournamentList] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [mode, setMode] = useState("list");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

  // else {
  //   throw new Error("Cannot be empty");
  // }
  const handleSubmit = async () => {
    try {
      console.log(tournament);
      if (isEdit) {
        if (!tournament.type || !tournament.type.length) {
          throw new Error("Length is Required");
        }
        if (!tournament.year || !tournament.year.length) {
          throw new Error("Year is Required");
        }
        if (!tournament.location.city || !tournament.location.city.length) {
          throw new Error("City is Required");
        }
        if (
          !tournament.location.country ||
          !tournament.location.country.length
        ) {
          throw new Error("Country is Required");
        }
        if (!tournament.name || !tournament.name.length) {
          throw new Error("Name is Required");
        }
        if (tournament.name.length !== 0) {
          const update = await userUpdateTournament(tournament);
          if (update?.response?.statusText === "Bad Request") {
            throw new Error(update.response.data.error);
          }
          if (update.statusText === "OK") {
            setSuccess("Updated Succesfully!");
          }
          setTournament({
            name: "",
            year: "",
            type: "",

            location: {
              city: "",
              country: "",
            },
            owner: "",
            private: true,
          });
        }
      } else {
        if (!tournament.type || !tournament.type.length) {
          throw new Error("Type is Required");
        }
        if (!tournament.year || !tournament.year.length) {
          throw new Error("Year is Required");
        }
        if (!tournament.location.city || !tournament.location.city.length) {
          throw new Error("City is Required");
        }
        if (
          !tournament.location.country ||
          !tournament.location.country.length
        ) {
          throw new Error("Coutnry is Required");
        }
        if (!tournament.name || !tournament.name.length) {
          throw new Error("Name is Required");
        }
        if (tournament.name.length !== 0) {
          const create = await userCreateTournament({
            name: tournament.name,
            year: tournament.year,
            type: tournament.type,

            location: {
              city: tournament.location.city,
              country: tournament.location.country,
            },
            private: tournament.private,
          });
          if (create?.response?.statusText === "Bad Request") {
            throw new Error(create.response.data.error);
          }
          if (create.statusText === "OK") {
            setSuccess("Created Succesfully!");
          }
          setTournament({
            name: "",
            year: "",
            type: "",

            location: {
              city: "",
              country: "",
            },
            owner: "",
            private: true,
          });
        }
      }
    } catch (e) {
      setError(e.message);
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
      setError(e.message);
    }
  };
  const handleDelete = async id => {
    const deleted = await userDeleteTournament(id);

    if (deleted.data.n === 0) {
      setError(`Couldn't delete. Cannot delete defaults`);
    } else if (deleted.statusText === "OK") {
      setSuccess("Deleted Succesfully!");
    }

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
      private: true,
    });
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
          <Grid xs={6} sm={5} className='p-1'>
            <Card>
              <input />
              <Button onClick={() => fetch()}>
                <RefreshIcon />
              </Button>
              {isLoading ? (
                <h6>Loading</h6>
              ) : (
                <ul
                  className='pt-2 pl-4 pr-2'
                  style={{
                    listStyle: "none",
                    maxHeight: "25rem",
                    overflow: "scroll",
                  }}
                >
                  {tournamentList.map(tournament => (
                    <li className='pt-1 d-flex justify-content-between'>
                      {`${tournament.name}`}
                      <Grid direction='row' container justify='flex-end'>
                        <div>
                          <Button
                            variant='outlined'
                            color='primary'
                            onClick={() => {
                              setTournament(tournament);
                              setIsEdit(true);
                            }}
                          >
                            <EditIcon fontSize='inherit' />
                          </Button>
                        </div>
                        <DeleteModal
                          deleteFunction={() => handleDelete(tournament._id)}
                        />
                      </Grid>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </Grid>
          <Grid xs={6} sm={7}>
            <Card>
              <Grid className='pb-4' xs={12} justify='center' container>
                {/* <input placeholder='Year'></input> */}
                <Grid className='p-4' direction='column' container>
                  {error && (
                    <Alert title='Error' severity='error' message={error} />
                  )}
                  {success && (
                    <Alert
                      title='Success'
                      severity='success'
                      message={success}
                    />
                  )}
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
                  <Selector
                    options={[{ title: "true" }, { title: "false" }]}
                    name='private'
                    label='Private'
                    onChange={onSelectorChange}
                    state={tournament}
                  />
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
                          setTournament({
                            name: "",
                            year: "",
                            type: "",

                            location: {
                              city: "",
                              country: "",
                            },
                            owner: "",
                            private: true,
                          });
                        }}
                        style={{ marginTop: "20px" }}
                      >
                        Cancel Edit{" "}
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
