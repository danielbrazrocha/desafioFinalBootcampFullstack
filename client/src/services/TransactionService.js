//const http = require('../http-common');
import http from '../http-common';

const get = (name) => {  
    //let searchName = `${name.substring(3,7)}-${name.substring(0,2)}`
  return http.get(`/api/transaction?period=${name}`);
};

const getMonthList = () => {  
    return http.get(`/api/transaction/monthlist`);
};

const remove = (id) => {
  return http.delete(`/api/transaction/delete?q=${id}`);
};
/*
const create = (data) => {
  return http.post('/pokemon', data);
};

const update = (id, data) => {
  return http.put(`/pokemon/${id}`, data);
};



const removeAll = () => {
  return http.delete(`/pokemon`);
};

const findByName = (name) => {
  return http.get(`/pokemon?name=${name}`);
};
*/
export default {  
  get,
  getMonthList,
  remove
  
  //create,
  //update,
  //remove,
  //removeAll,
  //findByName,
};