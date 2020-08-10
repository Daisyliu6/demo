const axios = require("axios");
REST_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather?q=";
APIKEY = process.env.KEY;

module.exports.weather = async function(query) {
const url = REST_ENDPOINT + query.city + "&units=metric&appid=" + APIKEY
result = await axios.get(url);
return result.data.main.temp;
}
