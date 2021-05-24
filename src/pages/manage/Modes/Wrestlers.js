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
    _id: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [teamOptions, setTeamOptions] = useState([]);
  const handleSubmit = async () => {
    try {
      console.log(wrestler);
      if (isEdit) {
        if (wrestler.fullName.length !== 0) {
          userUpdateWrestler(wrestler);
          setWrestler({
            team: "",
            fullName: "",
            lastName: "",
            owner: "",
            _id: "",
          });
        }
      } else {
        if (wrestler.fullName.length !== 0) {
          userCreateWrestler({
            fullName: wrestler.fullName,
            lastName: wrestler.lastName,
            team: wrestler.team,
          });
          setWrestler({
            team: "",
            fullName: "",
            lastName: "",
            owner: "",
            _id: "",
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const showDeleteModal = () => {};
  const onSelectorChange = e => {
    setWrestler({
      ...wrestler,
      [e.target.name]: e.target.value,
    });
  };

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
  useEffect(() => {
    const fetchTeam = async () => {
      const fetchedData = await userFetchTeam();
      console.log(fetchedData.data);
      const newArray = fetchedData.data.map(team => {
        return { title: team.teamName, id: team._id };
      });
      setTeamOptions(newArray);
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
                  {wrestlersList.map(wrestler => (
                    <li>
                      {wrestler.fullName}{" "}
                      <EditIcon
                        fontSize='inherit'
                        onClick={() => {
                          setWrestler(wrestler);
                          setIsEdit(true);
                        }}
                      />
                      <DeleteIcon
                        fontSize='inherit'
                        onClick={() => {
                          console.log(wrestler);
                          setRefresh(!refresh);

                          // showDeleteModal(wrestler._id);
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
                  <h6>Wrestlers:</h6>
                  <Grid className='pb-4' xs={12} container>
                    <TextField
                      id='outlined-helperText'
                      label=' '
                      value={wrestler.fullName}
                      onChange={e =>
                        setWrestler({ ...wrestler, fullName: e.target.value })
                      }
                      helperText='Full Name'
                    />
                    <TextField
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
                          userDeleteWrestler(wrestler);
                          setRefresh(!refresh);
                          setIsEdit(false);
                          setWrestler({
                            team: "",
                            fullName: "",
                            lastName: "",
                            owner: "",
                            _id: "",
                          });
                        }}
                        style={{ marginTop: "20px" }}
                      >
                        Delete{" "}
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
