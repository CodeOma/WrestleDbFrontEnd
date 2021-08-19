import React, { useState, useEffect } from "react";
import { userAutocompleteTeam } from "../controllers/manage/team";
import { Grid, TextField } from "@material-ui/core";

const AutoComplete = ({ searchFunction, name, setFunction, label, value }) => {
  const [suggestion, setSuggestion] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestionArray, setSuggestionArray] = useState([""]);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const onSearchchange = () => {
    try {
      //   setSearch(e.target.value);
      const fetch = async () => {
        const data = await searchFunction(search);
        setSuggestionArray(data);
        console.log(suggestionArray);
        console.log(search);
      };
      fetch();
      console.log(suggestion);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    onSearchchange();
  }, [search]);
  const suggSeleted = value => {
    setSearch(value);
    setSuggestion([]);
  };

  const renderResults = () => {
    try {
      if (suggestionArray.length === 0) {
        return null;
      }
      return (
        isOpen && (
          <Grid className='px-1'>
            <p className='d-flex flex-row'>
              <i>results:</i>
            </p>
            <ul
              className='justify-content-center'
              style={{ listStyleType: "none", paddingLeft: 0, border: "1px" }}
            >
              {suggestionArray.map(item => (
                <li
                  style={{ fontSize: "14px", cursor: "pointer" }}
                  onClick={() => {
                    setFunction(item.id);
                    setSearch(item.title);
                    setIsOpen(false);
                  }}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </Grid>
        )
      );
    } catch (error) {}
  };

  return (
    <Grid direction='column' className='d-flex' container>
      <Grid className='pt-1'>
        <div>
          <TextField
            className='w-100'
            id='outlined-helperText'
            label={""}
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
            helperText={label}
          />
          {/* <input
            value={search}
            // placeholder={`Search by ${searchTopic}`}
            onChange={e => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
            style={{
              padding: "5px",

              marginTop: "10px",
              width: "100%",
            }}
          /> */}
          {renderResults()}
        </div>
        {/* <Selector options={[""]} label={"Weight Class"} /> */}
      </Grid>
    </Grid>
  );
};

export default AutoComplete;
