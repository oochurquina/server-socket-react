const Server = require("./models/server");
// require('dotenv').config();
require('dotenv').config();
const server = new Server();

server.start();
