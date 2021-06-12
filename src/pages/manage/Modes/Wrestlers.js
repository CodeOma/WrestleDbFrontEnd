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
// import AutoComplete from "../../../components/Create/AutoCompleteInput";
import AutoComplete from "../../../pages/Autocomplete";
import Selector from "../../../pages/Selector";
import RefreshIcon from "@material-ui/icons/Refresh";
import Alert from "../../../components/components/Alert";
import DeleteModal from "../../../components/components/DeleteModal";

import {
  userCreateWrestler,
  userDeleteWrestler,
  userUpdateWrestler,
  userFetchWrestler,
} from "../../../controllers/manage/wrestler";
import {
  userAutocompleteTeam,
  userFetchTeam,
} from "../../../controllers/manage/team";
const Wrestlers = () => {
  const [mode, setMode] = useState("list");
  const [wrestlersList, setWrestlersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wrestler, setWrestler] = useState({
    fullName: "",
    lastName: "",
    team: "",
    owner: "",
    private: true,
    _id: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [teamOptions, setTeamOptions] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async () => {
    try {
      if (isEdit) {
        if (
          wrestler.fullName.length !== 0 &&
          wrestler.lastName.length !== 0 &&
          wrestler.team.length !== 0
        ) {
          const update = await userUpdateWrestler(wrestler);
          if (update?.response?.statusText === "Bad Request") {
            throw new Error(update.response.data.error);
          }
          if (update.statusText === "OK") {
            setSuccess("Created Succesfully!");
          }
          setWrestler({
            team: "",
            fullName: "",
            lastName: "",
            private: true,
            owner: "",
            _id: "",
          });
        } else {
          throw new Error("Cannot be empty");
        }
      } else {
        if (
          wrestler.fullName.length !== 0 &&
          wrestler.lastName.length !== 0 &&
          wrestler.team.length !== 0
        ) {
          const create = await userCreateWrestler({
            fullName: wrestler.fullName,
            lastName: wrestler.lastName,
            team: wrestler.team,
            private: wrestler.private,
          });
          if (create?.response?.statusText === "Bad Request") {
            throw new Error(create.response.data.error);
          }
          if (create.statusText === "OK") {
            console.log("yeetavas");
            setSuccess("Created Succesfully!");
          }
          setWrestler({
            team: "",
            fullName: "",
            lastName: "",
            owner: "",
            _id: "",
            private: true,
          });
        } else {
          throw new Error("Cannot be empty");
        }
      }
    } catch (e) {
      setError(e.message);
    }
  };
  const showDeleteModal = () => {};
  const onSelectorChange = e => {
    setWrestler({
      ...wrestler,
      [e.target.name]: e.target.value,
    });
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

  const fetch = async () => {
    try {
      // setIsLoading(true);
      const data = await userFetchWrestler();
      await setWrestlersList(data.data);
      // setIsLoading(false);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = async id => {
    const deleted = await userDeleteWrestler(id);

    if (deleted.data.n === 0) {
      setError(`Couldn't delete. Cannot delete defaults`);
    } else if (deleted.statusText === "OK") {
      setSuccess("Deleted Succesfully!");
    }

    setRefresh(!refresh);
    setIsEdit(false);
    setWrestler({
      team: "",
      fullName: "",
      lastName: "",
      owner: "",
      _id: "",
      private: true,
    });
  };
  useEffect(() => {
    const fetchTeam = async () => {
      const fetchedData = await userFetchTeam();
      console.log(fetchedData.data);
      const newArray = fetchedData.data.map(team => {
        return { title: team.teamName, id: team._id };
      });
      setTeamOptions(newArray);
      console.log("newArray");
    };
    fetchTeam();
  }, [refresh]);
  useEffect(() => {
    fetch();
  }, [refresh]);

  return (
    <div>
      <Grid aria-labelledby='form-dialog-title'>
        <h3 id='form-dialog-title'> Wrestlers </h3>

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
                  {wrestlersList.map(wrestler => (
                    <li className='pt-1 d-flex justify-content-between'>
                      {wrestler.fullName}{" "}
                      <Grid direction='row' container justify='flex-end'>
                        <div>
                          <Button
                            variant='outlined'
                            color='primary'
                            onClick={() => {
                              setWrestler(wrestler);
                              setIsEdit(true);
                            }}
                          >
                            <EditIcon fontSize='inherit' />
                          </Button>{" "}
                        </div>
                        <DeleteModal
                          deleteFunction={() => handleDelete(wrestler._id)}
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
                  )}{" "}
                  <h6>Wrestlers:</h6>
                  <Grid className='pb-4' xs={12} container>
                    <TextField
                      className='pr-2'
                      id='outlined-helperText'
                      label=' '
                      value={wrestler.fullName}
                      onChange={e =>
                        setWrestler({ ...wrestler, fullName: e.target.value })
                      }
                      helperText='Full Name'
                    />
                    <TextField
                      className='pl-1'
                      id='outlined-helperText'
                      label=' '
                      value={wrestler.lastName}
                      onChange={e =>
                        setWrestler({ ...wrestler, lastName: e.target.value })
                      }
                      helperText='Last Name'
                    />{" "}
                    <Selector
                      options={teamOptions}
                      name='team'
                      label='Team'
                      onChange={onSelectorChange}
                      state={wrestler}
                    />
                    <Selector
                      options={[{ title: "true" }, { title: "false" }]}
                      name='private'
                      label='Private'
                      onChange={onSelectorChange}
                      state={wrestler}
                    />
                  </Grid>
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
                          // userDeleteWrestler(wrestler);
                          setRefresh(!refresh);
                          setIsEdit(false);
                          setWrestler({
                            team: "",
                            fullName: "",
                            lastName: "",
                            owner: "",
                            _id: "",
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
                      onClick={
                        () => {
                          // console.log(wrestler);
                          handleSubmit();
                          setRefresh(!refresh);
                        }
                        //   console.log(matchInfo);
                      }
                      style={{ marginTop: "20px" }}
                    >
                      Create Wrestler{" "}
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

export default Wrestlers;
