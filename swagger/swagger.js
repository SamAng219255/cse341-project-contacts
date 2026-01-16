require("dotenv").config();
const swaggerAutogen = require("swagger-autogen")();

const doc = {
	info: {
		title: "Contacts API",
		description: "Stores and displays contacts.",
	},
	host: `${process.env.HOST}:${process.env.PORT}`,
	schemes: [
		"https"
	],
};

const outputFile = "./swagger.json";
const routes = [ "../routes/contacts.js" ];

swaggerAutogen(outputFile, routes, doc);
