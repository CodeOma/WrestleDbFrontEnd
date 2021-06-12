import axios from "axios";
import { getIdToken } from "../../firebase";

const API = process.env.REACT_APP_API;

//////Getting Matches By/////////////
export const getUserMatchByWrestler = async (
  wrestlerId,
  filters,
  skip,
  limit
) => {
  try {
    let skipNum = 0;
    if (skip > 0) {
      skipNum = skip * 20;
    }
    const token = await getIdToken();

    const data = axios.get(`${API}/user/match/wrestler/${wrestlerId}`, {
      params: { filters, skip: skipNum },
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  } catch (e) {
    return e;
  }
};
export const getUserMatchByTournament = async (id, filters, skip, limit) => {
  try {
    let skipNum = 0;
    if (skip > 0) {
      skipNum = skip * 20;
    }
    const token = await getIdToken();

    const data = axios.get(`${API}/user/match/tournament/${id}`, {
      params: { filters, skip: skipNum },
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(data);
    return data;
  } catch (e) {
    return e;
  }
};
///added await hopefully doesnt break
export const getUserMatchByTeam = async (team, filters, skip, limit) => {
  try {
    let skipNum = 0;
    if (skip > 0) {
      skipNum = skip * 20;
    }
    const token = await getIdToken();

    const data = axios.get(`${API}/user/matches/team/${team}`, {
      params: { filters, skip: skipNum },
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  } catch (e) {
    return e;
  }
};

export const userUpdateMatch = async match => {
  try {
    const token = await getIdToken();
    const update = await axios.put(`${API}/user/match/${match._id}`, match, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};
export const userCreateMatch = async match => {
  try {
    const token = await getIdToken();

    console.log(match._id);
    const update = await axios.put(`${API}/user/match`, match, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const userFetchMatch = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/match/all`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (e) {
    return e;
  }
};
