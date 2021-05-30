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
import Alert from "../../../components/components/Alert";
import DeleteModal from "../../../components/components/DeleteModal";

const Teams = () => {
  const [mode, setMode] = useState("list");
  const [teamsList, setTeamsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [team, setTeam] = useState({ teamName: "", owner: "", _id: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async () => {
    try {
      if (isEdit) {
        if (team.teamName.length !== 0) {
          const update = await userUpdateTeam(team);
          if (update?.response?.statusText === "Bad Request") {
            throw new Error(update.response.data.error);
          }
          if (update.statusText === "OK") {
            setSuccess("Created Succesfully!");
          }
          setTeam({ teamName: "", owner: "", _id: "" });
        } else {
          throw new Error("Cannot be empty");
        }
      } else {
        if (team.teamName.length !== 0) {
          const create = await userCreateTeam({
            teamName: team.teamName,
            owner: team.owner,
          });
          if (create?.response?.statusText === "Bad Request") {
            throw new Error(create.response.data.error);
          }
          if (create.statusText === "OK") {
            setSuccess("Created Succesfully!");
          }
          setTeam({ teamName: "", owner: "", _id: "" });
        } else {
          throw new Error("Cannot be empty");
        }
      }
    } catch (e) {
      setError(e.message);
    }
  };
  const showDeleteModal = () => {};

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
  const handleDelete = async id => {
    const deleted = await userDeleteTeam(id);

    if (deleted.statusText === "OK") {
      setSuccess("Deleted Succesfully!");
    }

    setRefresh(!refresh);
    setIsEdit(false);
    setTeam({ teamName: "", owner: "", _id: "" });
  };
  const fetch = async () => {
    try {
      // setIsLoading(true);
      const data = await userFetchTeam();
      await setTeamsList(data.data);
      // setIsLoading(false);
    } catch (e) {
      setError(e.message);
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
                  className='pt-2 pl-4 pr-2'
                  style={{
                    listStyle: "none",
                    maxHeight: "50%",
                    overflow: "scroll",
                  }}
                >
                  {teamsList.map(team => (
                    <li className='pt-1 d-flex justify-content-between'>
                      <p style={{ whiteSpace: "nowrap" }}>{team.teamName} </p>
                      <Grid direction='row' container justify='flex-end'>
                        <div>
                          <Button
                            variant='outlined'
                            color='primary'
                            onClick={() => {
                              setTeam(team);
                              setIsEdit(true);
                            }}
                          >
                            <EditIcon fontSize='inherit' />
                          </Button>{" "}
                        </div>
                        <DeleteModal
                          deleteFunction={() => handleDelete(team._id)}
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
                {error && (
                  <Alert title='Error' severity='error' message={error} />
                )}
                {success && (
                  <Alert title='Success' severity='success' message={success} />
                )}{" "}
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
                        Save{" "}
                      </Button>
                      <Button
                        onClick={() => {
                          setTeam({ teamName: "", owner: "", _id: "" });

                          setIsEdit(false);
                        }}
                        style={{ marginTop: "20px" }}
                      >
                        Cancel{" "}
                      </Button>{" "}
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
