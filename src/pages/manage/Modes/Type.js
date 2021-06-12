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
  userCreateType,
  userDeleteType,
  userUpdateType,
  userFetchType,
} from "../../../controllers/manage/type";
import RefreshIcon from "@material-ui/icons/Refresh";
import Alert from "../../../components/components/Alert";
import { userFetchPosition } from "../../../controllers/manage/position";
import DeleteModal from "../../../components/components/DeleteModal";

const Types = () => {
  const [mode, setMode] = useState("list");
  const [typesList, setTypesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState({
    type: "",
    position: "",
    owner: "",
    _id: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [positionOptions, setPositionOptions] = useState([]);
  const handleSubmit = async () => {
    try {
      console.log(type);
      if (isEdit) {
        if (!type.type || !type.type.length) {
          throw new Error("Type is Required");
        }
        if (!type.position || !type.position.length) {
          throw new Error("City is Required");
        }
        if (!type.type.length || !type.position.length) {
          const update = await userUpdateType(type);
          if (update?.response?.statusText === "Bad Request") {
            throw new Error(update.response.data.error);
          }
          if (update.statusText === "OK") {
            setSuccess("Created Succesfully!");
          }
          setType({ type: "", position: "", owner: "", _id: "" });
        } else {
          throw new Error("Cannot be empty");
        }
      } else {
        if (!type.type || !type.type.length) {
          throw new Error("Type is Required");
        }
        if (!type.position || !type.position.length) {
          throw new Error("City is Required");
        }
        if (!type.type.length || type.position.length) {
          const create = await userCreateType({
            type: type.type,
            position: type.position,

            owner: type.owner,
          });
          if (create?.response?.statusText === "Bad Request") {
            throw new Error(create.response.data.error);
          }
          if (create.statusText === "OK") {
            setSuccess("Created Succesfully!");
          }
          setType({ type: "", position: "", owner: "", _id: "" });
        } else {
          throw new Error("Cannot be empty");
        }
      }
    } catch (e) {
      setError(e.message);
    }
  };
  const showDeleteModal = () => {};
  const handleDelete = async id => {
    const deleted = await userDeleteType(id);

    if (deleted.data.n === 0) {
      setError(`Couldn't delete. Cannot delete defaults`);
    } else if (deleted.statusText === "OK") {
      setSuccess("Deleted Succesfully!");
    }

    setRefresh(!refresh);
    setIsEdit(false);
    setType({
      type: "",
      position: "",
      owner: "",
      _id: "",
    });
  };
  const onSelectorChange = e => {
    setType({
      ...type,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const fetchPosition = async () => {
      const fetchedData = await userFetchPosition();
      console.log(fetchedData.data);
      const newArray = fetchedData.data.map(pos => {
        return pos.position;
      });
      setPositionOptions(newArray);
      console.log(newArray);
    };
    fetchPosition();
  }, [refresh]);
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
      const data = await userFetchType();
      await setTypesList(data.data);
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
        <h3 id='form-dialog-title'> Type </h3>

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
                  {typesList.map(type => (
                    <li className='pt-1 d-flex justify-content-between'>
                      <p style={{ whiteSpace: "nowrap" }}>{type.type}</p>{" "}
                      <Grid direction='row' container justify='flex-end'>
                        <div>
                          <Button
                            variant='outlined'
                            color='primary'
                            onClick={() => {
                              setType(type);
                              setIsEdit(true);
                            }}
                          >
                            {" "}
                            <EditIcon fontSize='inherit' />
                          </Button>{" "}
                        </div>
                        <DeleteModal
                          deleteFunction={() => handleDelete(type._id)}
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
                  <h6>Types:</h6>
                  <TextField
                    id='outlined-helperText'
                    label=' '
                    helperText='Type'
                    value={type.type}
                    onChange={e => setType({ ...type, type: e.target.value })}
                  />{" "}
                  <br />
                  <Select
                    options={positionOptions}
                    name='position'
                    label='Position'
                    onChange={onSelectorChange}
                    state={type}
                    fn={setType}
                    value={type.position}
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
                          setIsEdit(false);
                          setType({
                            type: "",
                            position: "",
                            owner: "",
                            _id: "",
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
                          handleSubmit();
                          console.log(type);
                          setRefresh(!refresh);
                        }
                        //   console.log(matchInfo);
                      }
                      style={{ marginTop: "20px" }}
                    >
                      Create Type{" "}
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

export default Types;
