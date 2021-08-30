import axios from "axios";
import { getIdToken } from "../../firebase";

const API = process.env.REACT_APP_API;

export const userAutocompleteMatch = async query => {
  try {
    if (query.length > 0) {
      const token = await getIdToken();

      var url = `${API}/user/autosearch/match/${query}`;
      const fetch = await axios.get(url, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await fetch.data;

      return data;
      //console.log(this.state.suggestion);
      //console.log(resdata);
      //return resdata;
    }
  } catch (e) {
    return e;
  }
};

export const userAutocompleteWrestler = async query => {
  console.log(query);

  try {
    if (query.length > 0) {
      const token = await getIdToken();
      var url = `${API}/user/autosearch/wrestler/${query}`;
      const fetch = await axios.get(url, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await fetch.data;

      return data;
      //console.log(this.state.suggestion);
      //console.log(resdata);
      //return resdata;
    }
  } catch (e) {
    return e;
  }
};

export const userAutocompleteTeam = async query => {
  try {
    if (query.length > 0) {
      const token = await getIdToken();

      var url = `${API}/user/autosearch/team/${query}`;
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

export const userAutocompleteTournament = async query => {
  try {
    if (query.length > 0) {
      const token = await getIdToken();

      var url = `${API}/user/autosearch/tournament/${query}`;
      const fetch = await axios.get(url, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await fetch.data;
      console.log(data);
      return data;
      //console.log(this.state.suggestion);
      //console.log(resdata);
      //return resdata;
    }
  } catch (e) {
    return e;
  }
};
