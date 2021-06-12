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
import Alert from "../../../components/components/Alert";
import DeleteModal from "../../../components/components/DeleteModal";

const Tags = () => {
  const [mode, setMode] = useState("list");
  const [tagsList, setTagsList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tag, setTag] = useState({ tag: "", owner: "", _id: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleSubmit = async () => {
    try {
      if (isEdit) {
        if (tag.tag.length !== 0) {
          const update = await userUpdateTag(tag);
          console.log(update);
          if (update?.response?.statusText === "Bad Request") {
            throw new Error(update.response.data.error);
          }
          if (update.statusText === "OK") {
            setSuccess("Updated Succesfully!");
          }
          setTag({ tag: "", owner: "", _id: "" });
        } else {
          throw new Error("Cannot be empty");
        }
      } else {
        if (tag.tag.length !== 0) {
          const create = await userCreateTag({
            tag: tag.tag,
            owner: tag.owner,
          });
          if (create?.response?.statusText === "Bad Request") {
            throw new Error(create.response.data.error);
          }
          if (create.statusText === "OK") {
            setSuccess("Created Succesfully!");
          }

          setTag({ tag: "", owner: "", _id: "" });
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

  const showDeleteModal = () => {};
  const onSelectorChange = () => {};
  const handleDelete = async id => {
    const deleted = await userDeleteTag(id);
    if (deleted.data.n === 0) {
      setError(`Couldn't delete. Cannot delete defaults`);
    } else if (deleted.statusText === "OK") {
      setSuccess("Deleted Succesfully!");
    }
    setRefresh(!refresh);
    setIsEdit(false);
    setTag({ tag: "", owner: "", _id: "" });
  };
  const fetch = async () => {
    try {
      // setIsLoading(true);
      const data = await userFetchTag();
      await setTagsList(data.data);
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
      <Grid aria-labelledby='form-dialog-title' className='w-100'>
        <h3 id='form-dialog-title'> Tags </h3>

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
                  {tagsList.map(tag => (
                    <li className='pt-1 d-flex justify-content-between'>
                      <p style={{ whiteSpace: "nowrap" }}>{tag.tag}</p>
                      <Grid direction='row' container justify='flex-end'>
                        <div>
                          <Button
                            variant='outlined'
                            color='primary'
                            onClick={() => {
                              setTag(tag);
                              setIsEdit(true);
                            }}
                          >
                            <EditIcon fontSize='inherit' />
                          </Button>
                        </div>
                        <DeleteModal
                          deleteFunction={() => handleDelete(tag._id)}
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
                      <DeleteModal deleteFunction={handleDelete} />
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
