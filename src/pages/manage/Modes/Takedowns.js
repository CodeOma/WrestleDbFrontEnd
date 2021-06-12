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

import {
  userCreateTakedown,
  userDeleteTakedown,
  userUpdateTakedown,
  userFetchTakedown,
} from "../../../controllers/manage/takedown";
import {
  userAutocompleteTeam,
  userFetchTeam,
} from "../../../controllers/manage/team";
import { userFetchType } from "../../../controllers/manage/type";
import { userFetchPosition } from "../../../controllers/manage/position";
import { userFetchCategory } from "../../../controllers/manage/category";
import RefreshIcon from "@material-ui/icons/Refresh";
import Alert from "../../../components/components/Alert";
import DeleteModal from "../../../components/components/DeleteModal";

const Takedowns = () => {
  const [mode, setMode] = useState("list");
  const [takedownsList, setTakedownsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [takedown, setTakedown] = useState({
    takedown: "",
    type: "",
    offdef: "",

    position: "",
    category: "",
    owner: "",
    _id: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        userUpdateTakedown(takedown);
        const update = await setTakedown({
          takedown: "",
          type: "",
          position: "",
          category: "",
          offdef: "",
          owner: "",
          _id: "",
        });
        if (update?.response?.statusText === "Bad Request") {
          throw new Error(update.response.data.error);
        }
        if (update.statusText === "OK") {
          setSuccess("Created Succesfully!");
        }
      } else {
        const create = await userCreateTakedown({
          takedown: takedown.takedown,
          type: takedown.type,
          position: takedown.position,
          category: takedown.category,
          offdef: takedown.offdef,
        });
        if (create?.response?.statusText === "Bad Request") {
          throw new Error(create.response.data.error);
        }
        if (create.statusText === "OK") {
          setSuccess("Created Succesfully!");
        }

        setTakedown({
          takedown: "",
          type: "",
          offdef: "",

          position: "",
          category: "",
          owner: "",
          _id: "",
        });
      }
    } catch (e) {
      setError(e.message);
    }
  };
  const showDeleteModal = () => {};
  const onSelectorChange = e => {
    setTakedown({
      ...takedown,
      [e.target.name]: e.target.value,
    });
  };

  const fetch = async () => {
    try {
      // setIsLoading(true);
      const data = await userFetchTakedown();
      await setTakedownsList(data.data);
      // setIsLoading(false);
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
  useEffect(() => {
    fetch();
    const fetchType = async () => {
      const fetchedType = await userFetchType();
      const newArray = fetchedType.data.map(type => {
        return { title: type.type, id: type._id };
      });
      setTypeOptions(newArray);
    };
    fetchType();
    const fetchPosition = async () => {
      const fetchedPosition = await userFetchPosition();
      const newArray = fetchedPosition.data.map(position => {
        return { title: position.position, id: position._id };
      });
      setPositionOptions(newArray);
    };
    fetchPosition();
    // const fetchCategory = async () => {
    //   const fetchedCategory = await userFetchCategory();
    //   console.log(fetchedCategory.data);
    //   const newArray = fetchedCategory.data.map(category => {
    //     return { title: category.category, id: category._id };
    //   });
    //   setCategoryOptions(newArray);
    // };
    // fetchCategory();
  }, [refresh]);

  const handleDelete = async id => {
    const deleted = await userDeleteTakedown(id);
    console.log(deleted.data.n);
    if (deleted.data.n === 0) {
      setError(`Couldn't delete. Cannot delete defaults`);
    } else if (deleted.statusText === "OK") {
      setSuccess("Deleted Succesfully!");
    }

    setRefresh(!refresh);
    setIsEdit(false);
    setTakedown({
      type: "",
      position: "",
      owner: "",
      _id: "",
    });
  };
  useEffect(() => {
    fetch();
  }, [refresh]);

  return (
    <div>
      <Grid aria-labelledby='form-dialog-title'>
        <h3 id='form-dialog-title'> Takedowns </h3>

        <Grid container direction='row'>
          <Grid xs={6} sm={5} className='p-2'>
            <Card>
              <Grid container direction='row'>
                <input />
                <Button onClick={() => fetch()}>
                  <RefreshIcon />
                </Button>
              </Grid>

              {isLoading ? (
                <h6>Loading</h6>
              ) : (
                <ul
                  className='pt-2 pl-4 pr-2'
                  style={{
                    listStyle: "none",
                    maxHeight: "25rem",
                    overflow: "scroll",
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  {takedownsList.map(takedown => (
                    <li className='pt-1 d-flex justify-content-between'>
                      <p style={{ whiteSpace: "nowrap" }}>
                        {" "}
                        {takedown.takedown}{" "}
                      </p>
                      <Grid direction='row' container justify='flex-end'>
                        <div>
                          {" "}
                          <Button
                            variant='outlined'
                            color='primary'
                            onClick={() => {
                              setTakedown(takedown);
                              setIsEdit(true);
                            }}
                          >
                            <EditIcon fontSize='inherit' />
                          </Button>
                        </div>
                        <DeleteModal
                          deleteFunction={() => handleDelete(takedown._id)}
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
                  <h6>Takedowns:</h6>
                  <Grid className='pb-4' xs={12} container>
                    <TextField
                      id='outlined-helperText'
                      label=' '
                      helperText='Takedown'
                      value={takedown.takedown}
                      onChange={e =>
                        setTakedown({ ...takedown, takedown: e.target.value })
                      }
                    />
                    {/* <Selector
                      options={categoryOptions}
                      name='category'
                      label='Category'
                      onChange={onSelectorChange}
                      state={takedown}
                    />{" "} */}
                    <Selector
                      options={typeOptions}
                      name='type'
                      label='Type'
                      onChange={onSelectorChange}
                      state={takedown}
                    />{" "}
                    <Selector
                      options={[
                        { title: "Offensive", id: "1" },
                        { title: "Defensive", id: "2" },
                        { title: "Other", id: "3" },
                      ]}
                      name='offdef'
                      label='Offensive/Defensive'
                      onChange={onSelectorChange}
                      state={takedown}
                    />
                    <Selector
                      options={positionOptions}
                      name='position'
                      label='Position'
                      onChange={onSelectorChange}
                      state={takedown}
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
                        Save{" "}
                      </Button>
                      <Button
                        onClick={() => {
                          // userDeleteTakedown(takedown);
                          setRefresh(!refresh);
                          setIsEdit(false);
                          setTakedown({
                            takedown: "",
                            type: "",
                            position: "",
                            category: "",
                            owner: "",
                            offdef: "",

                            _id: "",
                          });
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
                      Create Takedown{" "}
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

export default Takedowns;
