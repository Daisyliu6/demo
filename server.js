require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

const func = require("./function");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname+'/weatherapp/dist/weatherapp'));
			
app.get("/:city", async function(req, res){
res.json(await func.weather(req.params));
});

app.listen(8080, () => console.log('Server is running!'));

app.use(function (req, res, next) {
	res.status(404).send('404')
});

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('500');
});
