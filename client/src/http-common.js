import axios from 'axios';
//baseURL
//baseURL: 'http://localhost:3001/',
//heroku
//baseURL: 'https://danielrocha-desafio-final.herokuapp.com/',
export default axios.create({
  baseURL: 'https://danielrocha-desafio-final.herokuapp.com/',
  headers: {
    'Content-type': 'application/json',
  },
});