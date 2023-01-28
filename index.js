const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");
require("dotenv").config();

console.log(process.env);

// Create express server

const app = express();

// Database

dbConnection();

// CORS

app.use(cors());

// Public dir

app.use(express.static("public"));

//Read and parse body

app.use(express.json());

// Routes

app.use("/api/auth", require("./routes/auth"));
app.use('/api/events', require('./routes/events'))

// listen request

app.listen(process.env.PORT, () => {
  console.log(`Server in port ${process.env.PORT}`);
});
