require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const func = require("./function");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create link to Angular build directory
app.use(express.static(__dirname + "/public"));

// connect to database
mongoose.Promise = global.Promise;
const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(process.env.DB_URI, connectionOptions)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database.", err);
    process.exit();
  });

const weatherSchema = mongoose.Schema(
  {
    city: String,
    temperature: Number,
    description: String,
    temp_min: Number,
    temp_max: Number,
    iconUrl: String,
  },
  { timestamps: true }
);
const Weather = mongoose.model("Weather", weatherSchema);

app.get("/:city", async function (req, res) {
	let result = await func.weather(req.params);
	const weather = new Weather({
	  city: result.city,
	  temperature: result.temp,
	  description: result.descrip,
	  temp_min: result.temp_min,
	  temp_max: result.temp_max,
	  iconUrl: result.iconUrl,
	});
	// save the weather info in the database
	weather.save();
	res.json(result);
  });

// error handle
app.use(function (req, res, next) {
  res.status(404).send("404");
});

process.on("uncaughtException", function (err) {
  console.log(err);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("500");
});

app.listen(process.env.PORT || 8080, () => console.log("Server is running!"));
