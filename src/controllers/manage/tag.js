import axios from "axios";
import { getIdToken } from "../../firebase";

const API = process.env.REACT_APP_API;

export const userCreateTag = async tag => {
  try {
    const token = await getIdToken();

    const update = await axios.post(`${API}/user/tag`, tag, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};
export const userUpdateTag = async tag => {
  try {
    const token = await getIdToken();

    const update = await axios.put(`${API}/user/tag`, tag, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};
export const userFetchTag = async () => {
  try {
    const token = await getIdToken();
    const data = axios.get(`${API}/user/tag/all`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (e) {
    return e;
  }
};
export const userFetchTagById = async id => {
  try {
    const token = await getIdToken();

    const data = await axios.get(`${API}/user/tag/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const userDeleteTag = async id => {
  try {
    const token = await getIdToken();

    const update = await axios.delete(`${API}/user/tag/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return update;
  } catch (e) {
    return e;
  }
};
export const userAutocompleteTag = async query => {
  try {
    if (query.length > 0) {
      const token = await getIdToken();
      console.log(query);
      var url = `${API}/user/autosearch/tag/${query}`;
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
