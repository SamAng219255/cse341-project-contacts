/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const env = require("dotenv").config()
const app = express()
const mongodb = require("./database")
const bodyParser = require("body-parser")
const path = require('path')
const static = require("./routes/static")
const contactsModel = require('./models/contacts')
const contactsRoute = require("./routes/contacts")

/* ***********************
 * Initialize Database connection
 * ************************/
mongodb.initDB((err, db) => { 
  if(err) throw err; 

  contactsModel.init(db);
})

/* ***********************
 * Middleware
 * ************************/

// Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(static)

// Routes
app.use("/contacts", contactsRoute);

app.use("/images/", async (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public", "images", "no-image.svg"))
})
app.use(async (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "filenotfound.html"))
})

const port = process.env.PORT
const host = process.env.HOST

app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})