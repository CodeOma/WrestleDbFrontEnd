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
import Select from "../../components/Create/Selector";
// import AutoComplete from "../../../components/Create/AutoCompleteInput";
import AutoComplete from "../../pages/Autocomplete";
import Selector from "../../pages/Selector";
import RefreshIcon from "@material-ui/icons/Refresh";
import Alert from "../../components/components/Alert";
import DeleteModal from "../../components/components/DeleteModal";

import {
  userCreateWrestler,
  userDeleteWrestler,
  userUpdateWrestler,
  userFetchWrestler,
} from "../../controllers/manage/wrestler";
import {
  userAutocompleteTeam,
  userFetchTeam,
} from "../../controllers/manage/team";
import { Link, useParams } from "react-router-dom";
import { AutocompleteWrestler } from "../../controllers/search";
import { getWrestlersList } from "../../controllers/controller";

const ProfileSearch = () => {
  const [mode, setMode] = useState("list");
  const [wrestlersList, setWrestlersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wrestler, setWrestler] = useState({
    fullName: "",
    team: "",
    weightClass: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [teamOptions, setTeamOptions] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filteredList, setFilteredList] = useState([]);
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

  // const fetch = async () => {
  //   try {
  //     // setIsLoading(true);
  //     const data = await userFetchWrestler();
  //     await setWrestlersList(data.data);
  //     // setIsLoading(false);
  //     console.log(data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
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
  // useEffect(() => {
  //   const fetchTeam = async () => {
  //     const wrestlersList = await userFetchTeam();
  //     console.log(wrestlersList.data);
  //     const newArray = wrestlersList.data.map(team => {
  //       return { title: team.teamName, id: team._id };
  //     });
  //     setTeamOptions(newArray);
  //   };
  //   fetchTeam();
  // }, [refresh]);
  // useEffect(() => {
  //   fetch();
  // }, [refresh]);
  useEffect(() => {
    const getWrestlers = async () => {
      const set = await AutocompleteWrestler(wrestler.fullName);
      set ? setFilteredList(set) : setFilteredList([]);
      console.log(filteredList);
    };
    getWrestlers();
  }, [wrestler]);
  return (
    <div style={{ background: "#f7fcfc" }}>
      <Grid className='p-4' aria-labelledby='form-dialog-title'>
        <Grid container direction='row' justify='center'>
          <Grid xs={6} sm={7}>
            <Card>
              {" "}
              <Grid
                xs={12}
                container
                alignContent='center'
                direction='column'
                className='py-4'
              >
                <h5>Wrestlers</h5>
                <TextField
                  className='w-75'
                  id='outlined-helperText'
                  label=' '
                  value={wrestler.fullName}
                  onChange={e =>
                    setWrestler({ ...wrestler, fullName: e.target.value })
                  }
                  helperText='Search'
                />
              </Grid>{" "}
              {/* <Grid justify='space-evenly' xs={12} container>
                <Selector
                  options={[{ title: "ALL", id: "all" }, ...teamOptions]}
                  name='team'
                  label='Team'
                  onChange={onSelectorChange}
                  state={wrestler}
                />
                <Selector
                  options={[
                    { title: "57", id: 57 },
                    { title: "61", id: 61 },
                    { title: "65", id: 65 },
                    { title: "70", id: 70 },
                    { title: "74", id: 74 },
                    { title: "79", id: 79 },
                    { title: "86", id: 86 },
                    { title: "92", id: 92 },
                    { title: "97", id: 97 },
                    { title: "125", id: 125 },
                  ]}
                  name='weightClass'
                  label='Weight Class'
                  onChange={onSelectorChange}
                  state={wrestler}
                />
              </Grid> */}
              {/* <Grid className='p-4' direction='column' container>
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
                </Grid> */}
              <br />
              <Grid container justify='center' sm={12} className='px-1'>
                <Grid
                  container
                  sm={12}
                  className='py-3 px-1'
                  justify='space-evenly'
                >
                  {!filteredList.length && (
                    <Grid container justify='center'>
                      <h4 style={{ color: "lightgrey" }}>
                        No wrestlers use Search
                      </h4>
                    </Grid>
                  )}

                  {filteredList &&
                    filteredList.length >= 1 &&
                    filteredList.map(wrest => {
                      return (
                        <Grid container className='p-2' xs={4}>
                          <Link to={`/wrestlers/${wrest.id}`}>
                            <Card className='p-2'>
                              <p>{wrest.title}</p>
                              {/* <h6>{wrest.team}</h6> */}
                              {/* type='img' link={`${wrest.url}?t=${wrest.videoTime}`}
                          />{" "}
                         
                           */}
                            </Card>
                          </Link>
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileSearch;
