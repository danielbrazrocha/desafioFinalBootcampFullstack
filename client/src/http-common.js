import axios from 'axios';

export default axios.create({
  baseURL: 'hhttp://danielrocha-desafio-final.herokuapp.com/',
  headers: {
    'Content-type': 'application/json',
  },
});