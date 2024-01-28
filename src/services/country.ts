import axios from 'axios';

async function apiFetchCountry(config:any) {
    return await axios({
      url:'https://restcountries.com/v3.1/all/',
      method: 'GET',
    });
  }

export {apiFetchCountry}