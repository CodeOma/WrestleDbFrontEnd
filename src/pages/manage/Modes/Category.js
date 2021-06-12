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
  userCreateCategory,
  userDeleteCategory,
  userUpdateCategory,
  userFetchCategory,
} from "../../../controllers/manage/category";
import RefreshIcon from "@material-ui/icons/Refresh";

const Category = () => {
  const [mode, setMode] = useState("list");
  const [categorysList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState({
    category: "",
    owner: "",
    _id: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleSubmit = async () => {
    try {
      console.log(category);
      if (isEdit) {
        if (category.category.length !== 0) {
          userUpdateCategory(category);
          setCategory({ category: "", owner: "", _id: "" });
        }
      } else {
        if (category.category.length !== 0) {
          userCreateCategory({
            category: category.category,
            owner: category.owner,
          });
          setCategory({ category: "", owner: "", _id: "" });
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
      const data = await userFetchCategory();
      await setCategoryList(data.data);
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
        <h3 id='form-dialog-title'> Category </h3>

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
                  className='pt-2'
                  style={{
                    listStyle: "none",
                    maxHeight: "50%",
                    overflow: "scroll",
                  }}
                >
                  {categorysList.map(category => (
                    <li>
                      {category.category}{" "}
                      <EditIcon
                        fontSize='inherit'
                        onClick={() => {
                          setCategory(category);
                          setIsEdit(true);
                        }}
                      />
                      <DeleteIcon
                        fontSize='inherit'
                        onClick={() => {
                          console.log(category);
                          setRefresh(!refresh);

                          // showDeleteModal(category._id);
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
                  <h6>Category:</h6>
                  <TextField
                    id='outlined-helperText'
                    label=' '
                    helperText='Category'
                    value={category.category}
                    onChange={e =>
                      setCategory({ ...category, category: e.target.value })
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
                          userDeleteCategory(category);
                          setRefresh(!refresh);
                          setIsEdit(false);
                          setCategory({ category: "", owner: "", _id: "" });
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
                      Create Category{" "}
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

export default Category;
