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
  userCreateTag,
  userDeleteTag,
  userUpdateTag,
  userFetchTag,
} from "../../../controllers/manage/tag";
import RefreshIcon from "@material-ui/icons/Refresh";

const Tags = () => {
  const [mode, setMode] = useState("list");
  const [tagsList, setTagsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tag, setTag] = useState({ tag: "", owner: "", _id: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleSubmit = async () => {
    try {
      console.log(tag);
      if (isEdit) {
        if (tag.tag.length !== 0) {
          userUpdateTag(tag);
          setTag({ tag: "", owner: "", _id: "" });
        }
      } else {
        if (tag.tag.length !== 0) {
          userCreateTag({ tag: tag.tag, owner: tag.owner });
          setTag({ tag: "", owner: "", _id: "" });
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
      const data = await userFetchTag();
      await setTagsList(data.data);
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
        <h3 id='form-dialog-title'> Tags </h3>

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
                  {tagsList.map(tag => (
                    <li>
                      {tag.tag}{" "}
                      <EditIcon
                        fontSize='inherit'
                        onClick={() => {
                          setTag(tag);
                          setIsEdit(true);
                        }}
                      />
                      <DeleteIcon
                        fontSize='inherit'
                        onClick={() => {
                          console.log(tag);
                          setRefresh(!refresh);

                          // showDeleteModal(tag._id);
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
                  <h6>Tags/Setups:</h6>
                  <TextField
                    id='outlined-helperText'
                    label=' '
                    helperText='Tag/Setup'
                    value={tag.tag}
                    onChange={e => setTag({ ...tag, tag: e.target.value })}
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
                          userDeleteTag(tag);
                          setRefresh(!refresh);
                          setIsEdit(false);
                          setTag({ tag: "", owner: "", _id: "" });
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
                      Create Tag{" "}
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

export default Tags;
