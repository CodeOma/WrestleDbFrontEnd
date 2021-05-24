import axios from "axios";
import { getIdToken } from "../../firebase";

const API = "http://localhost:5000";

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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
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
    console.log(filters);
    return data;
  } catch (error) {
    console.log(error);
  }
};
