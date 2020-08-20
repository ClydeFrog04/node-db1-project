const express = require("express");

const account = require("./accountsRouter");

const server = express();

server.use(express.json());
server.use("/api/account", account);

module.exports = server;
