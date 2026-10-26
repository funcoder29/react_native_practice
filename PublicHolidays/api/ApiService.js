import axios from "axios";
import Constants from "expo-constants";

const GITHUB_TOKEN = Constants.manifest?.extra?.GITHUB_TOKEN || process.env.GITHUB_TOKEN;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


export const fetchCountries = async () => {
var config = {
  method: 'get',
  url: 'https://openholidaysapi.org/Countries?languageIsoCode=EN',
  headers: { 
    'accept': 'application/json'
  }
};

const res = await axios(config)
// console.log(res.data);
return res.data;
}  

export const fetchHolidays = async (countryIsoCode, year = new Date().getFullYear()) => {  
    var config = {
  method: 'get',
  url: `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${countryIsoCode}&validFrom=${year}-01-01&validTo=${year}-12-31&languageIsoCode=EN`,
  headers: { 
    'accept': 'application/json'
  }
};

const res = await axios(config)
// console.log(res.data);
return res.data;
}

