import React, { useState, useEffect } from "react";
import { userFetchTag } from "../../../controllers/manage/tag";
import { userFetchTakedown } from "../../../controllers/manage/takedown";
import { userFetchPosition } from "../../../controllers/manage/position";
import { userFetchType } from "../../../controllers/manage/type";

import {
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Typography,
  Button,
  Card,
  Grid,
  Input,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const StatsSearch = () => {
  const [searchType, setSearchType] = useState("takedowns");

  //   const [modes, setModes] = useState({

  //   })
  return (
    <Grid container direction='row' className='m-4'>
      <h3>Stat Search</h3>

      <Grid container direction='row' xs={12}>
        <Grid
          xs={10}
          md={2}
          className='pt-4'
          style={{ backgroundColor: "white" }}
        >
          <Grid xs={12}>
            <Button
              onClick={() => setSearchType("technique")}
              style={
                searchType === "technique" ? { background: "lightgrey" } : {}
              }
            >
              Takedown
            </Button>{" "}
            <Button
              onClick={() => setSearchType("type")}
              style={searchType === "type" ? { background: "lightgrey" } : {}}
            >
              Type
            </Button>
            <Button
              onClick={() => setSearchType("setup/tag")}
              style={
                searchType === "setup/tag" ? { background: "lightgrey" } : {}
              }
            >
              Setup/Tags
            </Button>
          </Grid>{" "}
        </Grid>
        <Grid
          xs={10}
          // md={9}
          justify='center'
          style={{ backgroundColor: "white" }}
        >
          {searchType === "tags" && <SearchTab />}
          {searchType === "takedowns" && <SearchTab />}
          {searchType === "type" && <SearchTab />}
          {searchType === "position" && <SearchTab />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StatsSearch;

const SearchTab = ({ fetchFunction }) => {
  const [mode, setMode] = useState("list");
  const [tagsList, setTagsList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tag, setTag] = useState({ tag: "", owner: "", _id: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);

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

  return <div></div>;
};
