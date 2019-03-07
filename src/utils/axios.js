import axios from 'axios';

const req = axios.create({ baseURL: 'https://rs-knews.herokuapp.com/api/' });

export const serverGetRequest = (endpoints, query) => req.get(endpoints, query);

export const serverPostRequest = (endpoints, data) => req.post(endpoints, { ...data });

export const serverPatchRequest = (endpoints, data) => req.patch(endpoints, { inc_votes: data });

export const serverDeleteRequest = endpoints => req.delete(endpoints);
