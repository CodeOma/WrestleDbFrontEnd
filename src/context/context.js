import React, { useState, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import reducer from "./reducer";

const AppContext = React.createContext();

const initialState = {
  match: {
    _id: "",
    tournament: "",
    style: "Freestyle",
    weightClass: "",
    round: "",
    redWrestler: {
      id: "",

      fullName: "Name",
      team: "Name",
    },
    blueWrestler: {
      id: "",
      fullName: "Name",
      team: "Name",
    },
    result: {
      victoryType: "",
      [""]: "",
      [""]: "",
      winner: "",
      loser: "",
    },
    url: "",
    scores: [],
  },
  scores: {
    total: "",
    fullName: "",
    color: "",
    totalscores: [],
  },
  takedowns: {
    points: "",
    time: "",
    name: "",
    round: "",
    videoTime: 0,
    takedown: "",
    offdef: "",
    setup: "",
    details: "",
  },
  tournaments: [],
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addScore = (scoringInfo, wrestlerInfo, videoTime) => {
    dispatch({
      type: "ADD_SCORE",
      payload: { scoringInfo, wrestlerInfo, videoTime },
    });
  };
  const clearList = () => {
    dispatch({ type: "CLEAR_LIST" });
  };
  const removeTimeStamp = id => {
    dispatch({ type: "REMOVE", payload: id });
  };

  //   const fetchData = async () => {
  //     dispatch({ type: "LOADING" });
  //     const data = await axios.get(URL);
  //     dispatch({ type: "DISPLAY_ITEMS", payload: data });
  //   };
  const toggleAmount = (id, type) => {
    dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
  };
  const setTime = time => {
    dispatch({ type: "SET_TIME", payload: time });
  };
  const setMatch = matchInfo => {
    dispatch({ type: "SET_MATCH", payload: matchInfo });
  };
  useEffect(() => {
    // const fetchData = async () => {
    //   const fetch = await axios.get("http://localhost:5000/tournament");
    //   const data = await fetch.data;
    //   console.log(data);
    //   await dispatch({ type: "SET_TOURNAMENTS", payload: data });
    //   //  await dispatch({ type: "DISPLAY_ITEMS", payload: data });
    // };
    // fetchData();
  }, []);

  // useEffect(() => {
  //   dispatch({ type: "TIMESTAMP_TOTAL" });
  // }, [state.timestamps]);
  return (
    <AppContext.Provider
      value={{
        ...state,
        addScore,
        clearList,
        removeTimeStamp,
        toggleAmount,
        setMatch,
        setTime,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
