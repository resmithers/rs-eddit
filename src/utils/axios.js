import axios from 'axios';

const BE_URL = 'https://rs-knews.herokuapp.com/api/';

export const serverGetRequest = endpoints => (
  axios.get(BE_URL + endpoints)
);

export const serverPostRequest = (endpoints, data) => (
  axios.post(BE_URL + endpoints, { ...data })
);

export const serverPatchRequest = (endpoints, data) => (
  axios.patch(BE_URL + endpoints, { inc_votes: data })
);

export const serverDeleteRequest = (endpoints) => {
  axios.delete(BE_URL + endpoints);
};
