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
  userCreateTeam,
  userDeleteTeam,
  userUpdateTeam,
  userFetchTeam,
} from "../../../controllers/manage/team";
import RefreshIcon from "@material-ui/icons/Refresh";

const Teams = () => {
  const [mode, setMode] = useState("list");
  const [teamsList, setTeamsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [team, setTeam] = useState({ teamName: "", owner: "", _id: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleSubmit = async () => {
    try {
      console.log(team);
      if (isEdit) {
        if (team.teamName.length !== 0) {
          userUpdateTeam(team);
          setTeam({ teamName: "", owner: "", _id: "" });
        }
      } else {
        if (team.teamName.length !== 0) {
          userCreateTeam({ teamName: team.teamName, owner: team.owner });
          setTeam({ teamName: "", owner: "", _id: "" });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const showDeleteModal = () => {};
  const onSelectorChange = () => {};
  const fetch = async () => {
    try {
      // setIsLoading(true);
      const data = await userFetchTeam();
      await setTeamsList(data.data);
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
      <Grid aria-labelledby='form-dialog-title'>
        <h3 id='form-dialog-title'> Teams </h3>

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
                  {teamsList.map(team => (
                    <li>
                      {team.teamName}{" "}
                      <EditIcon
                        fontSize='inherit'
                        onClick={() => {
                          setTeam(team);
                          setIsEdit(true);
                        }}
                      />
                      <DeleteIcon
                        fontSize='inherit'
                        onClick={() => {
                          console.log(team);
                          setRefresh(!refresh);

                          // showDeleteModal(team._id);
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
                  <h6>Teams</h6>
                  <TextField
                    id='outlined-helperText'
                    label=' '
                    helperText='Team'
                    value={team.teamName}
                    onChange={e =>
                      setTeam({ ...team, teamName: e.target.value })
                    }
                  />{" "}
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
                          userDeleteTeam(team);
                          setRefresh(!refresh);
                          setIsEdit(false);
                          setTeam({ teamName: "", owner: "", _id: "" });
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
                          handleSubmit();
                          setRefresh(!refresh);
                        }
                        //   console.log(matchInfo);
                      }
                      style={{ marginTop: "20px" }}
                    >
                      Create Team{" "}
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

export default Teams;
