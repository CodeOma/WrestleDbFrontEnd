const reducer = (state, action) => {
  if (action.type === "ADD_SCORE") {
    // const { scoringInfo, wrestlerInfo } = action.payload;
    console.log(action.payload);
    // console.log(state);
    return {
      ...state,

      timestamps: [...state.timestamps, { ...action.payload, id: Date.now() }],
    };
  }
  if (action.type === "CLEAR_LIST") {
    return { ...state, timestamps: [] };
  }
  if (action.type === "ADD_FOOD") {
    let tempFoodList = [...state.foodList, action.payload];
    return { ...state, foodList: tempFoodList };
  }
  if (action.type === "REMOVE") {
    // console.log("helloo");
    console.log(action.payload);
    return {
      ...state,
      timestamps: state.timestamps.filter(
        timestamp => timestamp.id !== action.payload
      ),
    };
  }
  if (action.type === "SET_TIME") {
    console.log(state);

    return {
      ...state,
      videoTime: action.payload,
    };
  }
  if (action.type === "SET_MATCH") {
    const { tournament = "", round = "", year = "" } = action.payload;
    return {
      ...state,
      match: { tournament, round, year },
    };
  }
  if (action.type === "TIMESTAMP_TOTAL") {
    let mainTotal = state.timestamps.map(timestamp => {
      const { scoringInfo, wrestlerInfo } = timestamp;
      if (wrestlerInfo.wrestlerColor === "red") {
        return scoringInfo.score;
      }
    });
    let opponentTotal = state.timestamps.map(timestamp => {
      const { scoringInfo, wrestlerInfo } = timestamp;
      if (wrestlerInfo.wrestlerColor === "red") {
        return scoringInfo.score;
      }
    });
    let totalPointsScored = {
      red: "",
    };
    return { ...state, totalPointsScored };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    // console.log(action.payload);
    return { ...state, match: { ...action.payload }, loading: false };
  }
  if (action.type === "SET_TOURNAMENTS") {
    console.log(action.payload);

    return { ...state, tournaments: [...action.payload] };
  }
  // if (action.type === "TOGGLE_AMOUNT") {
  //   let tempFoodList = state.foodList
  //     .map(foodListItem => {
  //       if (foodListItem.id === action.payload.id) {
  //         if (action.payload.type === "inc") {
  //           return { ...foodListItem, amount: foodListItem.amount + 1 };
  //         }
  //         if (action.payload.type === "dec") {
  //           return { ...foodListItem, amount: foodListItem.amount - 1 };
  //         }
  //       }
  //       return foodListItem;
  //     })
  //     .filter(foodListItem => foodListItem.amount !== 0);
  //   return { ...state, foodList: tempFoodList };
  // }
  throw new Error("no matching action type");
};

export default reducer;
