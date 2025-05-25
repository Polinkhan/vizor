// ------------------------------------------
// Dependencies
// ------------------------------------------
require("dotenv").config();
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const { Server } = require("socket.io");

// ------------------------------------------
// App
// ------------------------------------------
const app = express();
const server = http.createServer(app);

// ------------------------------------------
// Socket Route
// ------------------------------------------
require("./app/route/init")(new Server(server));

// ------------------------------------------
// default middlewares
// ------------------------------------------
app.use(cors());
app.use(morgan("dev"));

// ------------------------------------------
// Listening to server
// ------------------------------------------
server.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
