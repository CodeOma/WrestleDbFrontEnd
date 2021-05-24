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

const Types = () => {
  const [mode, setMode] = useState("list");
  const [typesList, setTypesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState({
    type: "",
    owner: "",
    _id: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleSubmit = async () => {
    try {
      console.log(type);
      if (isEdit) {
        if (type.type.length !== 0) {
          userUpdateType(type);
          setType({ type: "", owner: "", _id: "" });
        }
      } else {
        if (type.type.length !== 0) {
          userCreateType({
            type: type.type,
            owner: type.owner,
          });
          setType({ type: "", owner: "", _id: "" });
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
                  {typesList.map(type => (
                    <li>
                      {type.type}{" "}
                      <EditIcon
                        fontSize='inherit'
                        onClick={() => {
                          setType(type);
                          setIsEdit(true);
                        }}
                      />
                      <DeleteIcon
                        fontSize='inherit'
                        onClick={() => {
                          console.log(type);
                          setRefresh(!refresh);

                          // showDeleteModal(type._id);
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
                  <h6>Types:</h6>
                  <TextField
                    id='outlined-helperText'
                    label=' '
                    helperText='Type'
                    value={type.type}
                    onChange={e => setType({ ...type, type: e.target.value })}
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
                          userDeleteType(type);
                          setRefresh(!refresh);
                          setIsEdit(false);
                          setType({ type: "", owner: "", _id: "" });
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
