const axios = require("axios");

module.exports.weather = async function (query) {
  const url = process.env.REST_ENDPOINT + query.city + "&units=metric&appid=" + process.env.KEY;
  result = await axios.get(url);
  const description = result.data.weather[0].description;
  const icon = result.data.weather[0].icon;
  const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  // the result contains many thigns only need temp, min temp, max temp, descrip, icon
  const neededData = {
    temp: result.data.main.temp,
    temp_min: result.data.main.temp_min,
    temp_max: result.data.main.temp_max,
    descrip: description,
    iconUrl: iconUrl,
  };
  return neededData;
};
