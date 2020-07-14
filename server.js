"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { clients } = require("./data/clients");
const { words } = require("./data/words");

const { v4: uuidv4 } = require("uuid");

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

  .get("/hangman/word/:id", (req, res) => {
    const wordID = req.params.id;
    const thisWord = words.find((word) => word.id === wordID);
    res.status(200).json(thisWord.word);
  })

  .get("/hangman/word/", (req, res) => {
    const randomWordIndex = Math.floor(Math.random() * 11);
    console.log(randomWordIndex);
    const secretWord = words[randomWordIndex];
    console.log(secretWord);
    res.status(200).json({
      id: secretWord.id,
      letterCount: secretWord.letterCount,
    });
  })

  .get("/hangman/guess/:id/:letter", (req, res) => {
    const guessWordID = req.params.id;
    const guessLetter = req.params.letter;
    const guessWordObject = words.find((word) => word.id === guessWordID);
    const guessWord = guessWordObject.word;
    const guessWordArray = guessWord.split("");
    const guessArray = guessWordArray.map((letter) => letter === guessLetter);
    res.status(200).json({
      status: 200,
      guess: guessArray,
    });
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
