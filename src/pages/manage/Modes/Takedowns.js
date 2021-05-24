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

  const handleSubmit = async () => {
    try {
      console.log(takedown);
      if (isEdit) {
        if (
          takedown.takedown !== "" &&
          takedown.offdef !== "" &&
          takedown.position !== "" &&
          takedown.type !== "" &&
          takedown.category !== ""
        ) {
          userUpdateTakedown(takedown);
          setTakedown({
            takedown: "",
            type: "",
            position: "",
            category: "",
            offdef: "",
            owner: "",
            _id: "",
          });
        }
      } else {
        if (
          takedown.takedown !== "" &&
          takedown.offdef !== "" &&
          takedown.position !== "" &&
          takedown.type !== "" &&
          takedown.category !== ""
        ) {
          userCreateTakedown({
            takedown: takedown.takedown,
            type: takedown.type,
            position: takedown.position,
            category: takedown.category,
            offdef: takedown.offdef,
          });
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
      }
    } catch (e) {
      console.log(e);
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
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetch();
    const fetchType = async () => {
      const fetchedType = await userFetchType();
      console.log(fetchedType.data);
      const newArray = fetchedType.data.map(type => {
        return { title: type.type, id: type._id };
      });
      setTypeOptions(newArray);
    };
    fetchType();
    const fetchPosition = async () => {
      const fetchedPosition = await userFetchPosition();
      console.log(fetchedPosition.data);
      const newArray = fetchedPosition.data.map(position => {
        return { title: position.position, id: position._id };
      });
      setPositionOptions(newArray);
    };
    fetchPosition();
    const fetchCategory = async () => {
      const fetchedCategory = await userFetchCategory();
      console.log(fetchedCategory.data);
      const newArray = fetchedCategory.data.map(category => {
        return { title: category.category, id: category._id };
      });
      setCategoryOptions(newArray);
    };
    fetchCategory();
  }, [refresh]);
  useEffect(() => {
    fetch();
  }, [refresh]);

  return (
    <div>
      <Grid aria-labelledby='form-dialog-title'>
        <h3 id='form-dialog-title'> Takedowns </h3>

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
                  {takedownsList.map(takedown => (
                    <li>
                      {takedown.takedown}{" "}
                      <EditIcon
                        fontSize='inherit'
                        onClick={() => {
                          setTakedown(takedown);
                          setIsEdit(true);
                        }}
                      />
                      <DeleteIcon
                        fontSize='inherit'
                        onClick={() => {
                          console.log(takedown);
                          setRefresh(!refresh);

                          // showDeleteModal(takedown._id);
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
                    <Selector
                      options={categoryOptions}
                      name='category'
                      label='Category'
                      onChange={onSelectorChange}
                      state={takedown}
                    />{" "}
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
                        Save Edit{" "}
                      </Button>
                      <Button
                        onClick={() => {
                          userDeleteTakedown(takedown);
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
                        Delete{" "}
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={
                        () => {
                          console.log(takedown);
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
