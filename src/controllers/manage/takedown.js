import axios from "axios";
import { getIdToken } from "../../firebase";

const API = process.env.REACT_APP_API;

export const userCreateTakedown = async takedown => {
  try {
    const token = await getIdToken();

    const update = await axios.post(`${API}/user/takedown`, takedown, {
      headers: { authorization: `Bearer ${token}` },
    });

    return update;
  } catch (e) {
    console.log(e);
    return e;
  }
};
export const userUpdateTakedown = async takedown => {
  try {
    const token = await getIdToken();

    const update = await axios.put(`${API}/user/takedown`, takedown, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(update);
  } catch (e) {
    console.log(e);
  }
};
export const userFetchTakedown = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/takedown/all`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const userFetchTakedownById = async id => {
  try {
    const token = await getIdToken();

    const data = await axios.get(`${API}/user/takedown/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  } catch (e) {
    return e;
  }
};
export const userDeleteTakedown = async id => {
  try {
    const token = await getIdToken();
    const update = await axios.delete(`${API}/user/takedown/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};

export const userAutocompleteTakedown = async query => {
  try {
    if (query.length > 0) {
      const token = await getIdToken();
      console.log(query);
      var url = `${API}/user/autosearch/takedown/${query}`;
      const fetch = await axios.get(url, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await fetch.data;
      return data;
    }
  } catch (e) {
    return e;
  }
};
