import axios from 'axios';

const req = axios.create({ baseURL: 'https://rs-knews.herokuapp.com/api/' });

export default req;

export const serverGetRequest = (endpoints, query) => req.get(endpoints, query);

export const serverPostRequest = (endpoints, data) => req.post(endpoints, { ...data });

export const serverDeleteRequest = endpoints => req.delete(endpoints);
