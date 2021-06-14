// import queryString from "query-string";
import axios from "axios";
import firebase from "firebase";
import { getIdToken } from "../firebase";

const API = process.env.REACT_APP_API;

// const config = {
//   headers: { Authorization: `Bearer ${token}` },
// };

export const getMatchByWrestlerId = async id => {
  try {
    const token = await getIdToken();

    if (token) {
      const data = axios.get(`${API}/user/match/wrestler/list/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return data;
    } else {
      const data = axios.get(`${API}/user/match/wrestler/publiclist/${id}`);
      return data;
    }
  } catch (e) {
    return e;
  }
};

export const getWrestlerById = id => {
  try {
    const data = axios.get(`${API}/wrestler/${id}`, {});
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getMatches = sortBy => {
  return axios
    .get(`${API}/matches?sortBy=${sortBy}&order=desc&limit=6`)
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getTournaments = () => {
  return axios
    .get(`${API}/tournament`)
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
export const getWrestlersList = () => {
  return axios
    .get(`${API}/wrestlers`)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getStatCategories = () => {
  return fetch(`${API}/stat/categories`, {
    method: "GET",
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getMatch = matchId => {
  return axios
    .get(`${API}/match/${matchId}`)
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//////Getting Matches By/////////////
export const getMatchByWrestler = async (wrestlerId, filters, skip, limit) => {
  try {
    let skipNum = 0;
    if (skip > 0) {
      skipNum = skip * 20;
    }
    const data = axios.get(`${API}/match/wrestler/${wrestlerId}`, {
      params: { filters, skip: skipNum },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getMatchByTournament = async (id, filters, skip, limit) => {
  try {
    let skipNum = 0;
    if (skip > 0) {
      skipNum = skip * 20;
    }
    const data = axios.get(`${API}/match/tournament/${id}`, {
      params: { filters, skip: skipNum },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
///added await hopefully doesnt break
export const getMatchByTeam = async (team, filters, skip, limit) => {
  try {
    let skipNum = 0;
    if (skip > 0) {
      skipNum = skip * 20;
    }
    const data = axios.get(`${API}/matches/team/${team}`, {
      params: { filters, skip: skipNum },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
///////////////////////////////////////
export const listRelated = wrestlerId => {
  return fetch(`${API}/match/${wrestlerId}`)
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
/////////////////////////////////

/////////Get top stats///////////
//////////////////////////////////

export const getGeneralStats = async () => {
  try {
    const data = axios.get(`${API}/stats/general`);
    return data;
  } catch (e) {
    return e;
  }
};

export const getTakedownStats = async () => {
  try {
    const data = axios.get(`${API}/stats/all`);
    return data;
  } catch (e) {
    return e;
  }
};

export const individualProfileStats = async id => {
  try {
    const data = axios.get(`${API}/stats/wrestler/${id}`);
    return data;
  } catch (e) {
    return e;
  }
};
/////////////////////////////////
///Techniques////
export const getAllTechniques = async (
  wrestlerId,
  filters,
  skip
  // limit,
) => {
  try {
    let skipNum = 0;
    if (skip > 0) {
      skipNum = skip * 20;
    }
    const token = await getIdToken();
    const data = axios.get(`${API}/techniques/all`, {
      params: { filters, skip: skipNum },

      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (e) {
    return e;
  }
};

//Patch
export const updateMatch = async match => {
  try {
    const update = await axios.put(`${API}/match/${match._id}`, match);
  } catch (e) {
    console.log(e);
  }
};

export const createWrestler = async wrestler => {
  try {
    const update = await axios.put(`${API}/wrestler`, wrestler);
    console.log(update);
  } catch (e) {
    console.log("THERE was an error");
    console.log(e);
  }
};

export const createTournament = async tournament => {
  console.log(tournament);
  try {
    const update = await axios.put(`${API}/tournament`, tournament);
    console.log(update);
  } catch (e) {
    console.log("THERE was an error");
    console.log(e);
  }
};
