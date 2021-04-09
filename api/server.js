const express = require('express');
const server = express();
const actionsRouter = require("./actions/actions-router.js")
// const mw = require("./middleware/middleware.js")

// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.use(express.json())
server.use("/api/actions", actionsRouter)

server.get('/', (req,res) => {
    res.send(`<h2>sprint challenge creating apis</h2>`)
})


module.exports = server;
