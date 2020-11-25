console.log(`apiRoute`)

const routes = require('express').Router();

const database = require("../db/db.json")
console.log(database)
// database.push({extraob:true})
// console.log(database)

routes.get('/test', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});
routes.get('/notes', (req, res) => {

  //get all notes form db

  //send them back to the user
  res.status(200).json(database)
});

module.exports = routes;
