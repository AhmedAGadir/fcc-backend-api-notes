let express = require("express");
let app = express();

const bodyParser = require("body-parser");

console.log("Hello World");

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(__dirname + "/public"));

app.use(function (req, res, next) {
	// logger
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
});

app.get("/", function (req, res) {
	// res.send('Hello Express');
	res.sendFile(__dirname + "/views/index.html");
});

app.get(
	"/now",
	function (req, res, next) {
		req.time = new Date().toString();
		next();
	},
	function (req, res) {
		res.json({ time: req.time });
	}
);

app.get("/:word/echo", (req, res) => {
	res.json({ echo: req.params.word });
});

app.get("/name", (req, res) => {
	res.json({ name: `${req.query.first} ${req.query.last}` });
});

app.post("/name", (req, res) => {
	res.json({ name: `${req.body.first} ${req.body.last}` });
});

app.get("/json", function (req, res) {
	res.json({
		message:
			process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json",
	});
});

module.exports = app;
