import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMode, setSearchMode] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const fetch = await axios.get("http://localhost:5000/tournament");
      const data = await fetch.data;
      console.log(data);

      setFetchedData(data);
      //   searchResults();
      setIsLoading(false);
      console.log(query);
    };
    getData();
  }, [query]);

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setQuery(searchTerm);
  };
  /////CSS////
  const styles = {
    root: {
      maxHeight: 700,
      overflow: "scroll",
      backgroundColor: "white",
    },
    search: {
      maxHeight: 700,
      overflow: "scroll",
      backgroundColor: "pink",
    },
  };
  //////
  return (
    <Grid
      style={styles.root}
      container
      className='p-3'
      spacing={1}
      component={Paper}
    >
      <Grid xs={3} style={styles.search} component={Paper}>
        <Grid direction='row'>
          <form onSubmit={handleSubmit}>
            <input onChange={handleChange} placeholder='Search food...'></input>
            <button>Search!</button>
          </form>
          <button onClick={() => setSearchMode(!searchMode)}>
            {searchMode ? "Quicklist (no micros)" : "Use USDA DB"}
          </button>
        </Grid>

        {isLoading ? <h1>Loading....</h1> : <h1>yeet</h1>}
      </Grid>
    </Grid>
  );
};

export default SearchPage;
