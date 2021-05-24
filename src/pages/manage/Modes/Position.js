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
  const handleSubmit = async () => {
    try {
      console.log(position);
      if (isEdit) {
        if (position.position.length !== 0) {
          userUpdatePosition(position);
          setPosition({ position: "", owner: "", _id: "" });
        }
      } else {
        if (position.position.length !== 0) {
          userCreatePosition({
            position: position.position,
            owner: position.owner,
          });
          setPosition({ position: "", owner: "", _id: "" });
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
      const data = await userFetchPosition();
      await setPositionsList(data.data);
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
                  className='pt-2'
                  style={{
                    listStyle: "none",
                    maxHeight: "50%",
                    overflow: "scroll",
                  }}
                >
                  {positionsList.map(position => (
                    <li>
                      {position.position}{" "}
                      <EditIcon
                        fontSize='inherit'
                        onClick={() => {
                          setPosition(position);
                          setIsEdit(true);
                        }}
                      />
                      <DeleteIcon
                        fontSize='inherit'
                        onClick={() => {
                          console.log(position);
                          setRefresh(!refresh);

                          // showDeleteModal(position._id);
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
                        Save Edit{" "}
                      </Button>
                      <Button
                        onClick={() => {
                          userDeletePosition(position);
                          setRefresh(!refresh);
                          setIsEdit(false);
                          setPosition({ position: "", owner: "", _id: "" });
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
