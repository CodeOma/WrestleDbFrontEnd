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
  userCreatePosition,
  userDeletePosition,
  userUpdatePosition,
  userFetchPosition,
} from "../../../controllers/manage/position";
import RefreshIcon from "@material-ui/icons/Refresh";
import Alert from "../../../components/components/Alert";
import DeleteModal from "../../../components/components/DeleteModal";

const Positions = () => {
  const [mode, setMode] = useState("list");
  const [positionsList, setPositionsList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({
    position: "",
    owner: "",
    _id: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDelete = async id => {
    const deleted = await userDeletePosition(id);
    if (deleted.statusText === "OK") {
      setSuccess("Deleted Succesfully!");
    }
    setRefresh(!refresh);
    setIsEdit(false);
    setPosition({ position: "", owner: "", _id: "" });
  };
  const handleSubmit = async () => {
    try {
      if (isEdit) {
        if (position.position.length !== 0) {
          const update = await userUpdatePosition(position);
          if (update?.response?.statusText === "Bad Request") {
            throw new Error(update.response.data.error);
          }
          if (update.statusText === "OK") {
            setSuccess("Created Succesfully!");
          }
          setPosition({
            position: "",
            owner: "",
            _id: "",
          });
        } else {
          throw new Error("Cannot be empty");
        }
      } else {
        if (position.position.length !== 0) {
          const create = await userCreatePosition({
            position: position.position,
            owner: position.owner,
          });
          if (create?.response?.statusText === "Bad Request") {
            throw new Error(create.response.data.error);
          }
          if (create.statusText === "OK") {
            setSuccess("Created Succesfully!");
          }

          setPosition({ position: "", owner: "", _id: "" });
        } else {
          throw new Error("Cannot be empty");
        }
      }
    } catch (e) {
      setError(e.message);
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
  const fetch = async () => {
    try {
      // setIsLoading(true);
      const data = await userFetchPosition();
      await setPositionsList(data.data);
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
        <h3 id='form-dialog-title'> Positions </h3>

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
                    maxHeight: "25rem",
                    overflow: "scroll",
                  }}
                >
                  {positionsList.map(position => (
                    <li className='pt-1 d-flex justify-content-between'>
                      <p style={{ whiteSpace: "nowrap" }}>
                        {position.position}{" "}
                      </p>
                      <Grid direction='row' container justify='flex-end'>
                        <div>
                          <Button
                            variant='outlined'
                            color='primary'
                            onClick={() => {
                              setPosition(position);
                              setIsEdit(true);
                            }}
                          >
                            <EditIcon fontSize='inherit' />
                          </Button>
                        </div>
                        <DeleteModal
                          deleteFunction={() => handleDelete(position._id)}
                        />
                      </Grid>
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
                  <h6>Positions:</h6>
                  <TextField
                    id='outlined-helperText'
                    label=' '
                    helperText='Position'
                    value={position.position}
                    onChange={e =>
                      setPosition({ ...position, position: e.target.value })
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
                        Save
                      </Button>
                      <Button
                        onClick={() => {
                          setPosition({ position: "", owner: "", _id: "" });
                          setIsEdit(false);
                        }}
                        style={{ marginTop: "20px" }}
                      >
                        Cancel
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
                      Create Position{" "}
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

export default Positions;
