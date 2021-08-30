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
  } catch (e) {
    return e;
  }
};

export const getTournaments = () => {
  try {
    const data = axios.get(`${API}/tournament`, {});
    return data;
  } catch (e) {
    return e;
  }
};

export const getTeams = async () => {
  try {
    const data = axios.get(`${API}/team`);
    return data;
  } catch (e) {
    return e;
  }
};
export const getWrestlersList = async () => {
  try {
    const data = axios.get(`${API}/wrestlers`);
    return data;
  } catch (e) {
    return e;
  }
};

export const getMatch = async matchId => {
  try {
    const data = axios.get(`${API}/match/${matchId}`);
    return data;
  } catch (e) {
    return e;
  }
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
  } catch (e) {
    return e;
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
  } catch (e) {
    return e;
  }
};

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
  } catch (e) {
    return e;
  }
};

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
    return update;
  } catch (e) {
    return e;
  }
};

export const createWrestler = async wrestler => {
  try {
    const update = await axios.put(`${API}/wrestler`, wrestler);
    return update;
  } catch (e) {
    return e;
  }
};

export const createTournament = async tournament => {
  console.log(tournament);
  try {
    const update = await axios.put(`${API}/tournament`, tournament);
    return update;
  } catch (e) {
    return e;
  }
};
