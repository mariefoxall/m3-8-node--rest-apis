"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { clients } = require("./data/clients");
const { v4: uuidv4 } = require("uuid");
console.log(clients);

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  .get("/clients", (req, res) => {
    res.status(200).send(JSON.stringify(clients));
  })

  .get("/clients/:id", (req, res) => {
    const clientID = req.params.id;
    const currentClient = clients.find((client) => client.id === clientID);
    res.status(200).send(JSON.stringify(currentClient));
  })

  .post("/addclient", (req, res) => {
    if (clients.find((client) => client.email === req.body.email)) {
      res.status(400).json({
        status: 400,
        data: req.body,
        message: "This email is already registered",
      });
    } else {
      const newClient = req.body;
      newClient.id = uuidv4();
      clients.push(newClient);
      res.status(201).send(clients);
    }
  })

  .delete("/removeclient/:id", (req, res) => {
    const deleteClientIndex = clients.findIndex(
      (client) => client.id === req.params.id
    );
    clients.splice(deleteClientIndex, 1);
    res.status(200).send(clients);
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
