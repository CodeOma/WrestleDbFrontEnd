import axios from "axios";
import { getIdToken } from "../../firebase";

const API = process.env.REACT_APP_API;

export const getAllTechniquesByUser = async (
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
    const data = axios.get(`${API}/techniques/user/all`, {
      params: { filters, skip: skipNum },

      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getTeamsByUser = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/team`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getTagsByUser = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/tag/all`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getTypeByUser = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/type`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getTakedownsByUser = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/takedown`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getPositionsByUser = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/positions`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserGeneralStats = async () => {
  try {
    const token = await getIdToken();

    const data = axios.get(`${API}/user/stats/general`, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const individualUserProfileStats = async id => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/stats/wrestler/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
