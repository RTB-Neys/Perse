// console.log(`apiRoute`)
const express = require("express");
const app = express();
const routes = require('express').Router();
const database = require("../db/db.json");
const fs = require('fs');
// console.log(database)
// // database.push({extraob:true})
// // console.log(database)

routes.get('/test', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});
routes.get('/notes', (req, res) => {

  //get all notes form db

  //send them back to the user
  res.status(200).json(database)
});

module.exports = routes;

routes.post("/api/notes", function (req, res) {

	let addedNote = JSON.stringify(req.body);

	fs.readFile('./db/db.json', 'utf8', (err, data) => {
		if (err) throw err;

		let dataArray = JSON.parse(data);
		let lastNoteId = dataArray[dataArray.length - 1].id;

		if (lastNoteId === undefined ){
			lastNoteId = 0;
		}
		console.log("last note id", lastNoteId);

		let newId = lastNoteId + 1;
		console.log("new ID", newId);

		addedNote = '{' + `"id":${newId},` + addedNote.substr(1);
		let addedNoteJSON = JSON.parse(addedNote);
		console.log('addedNoteJSON', addedNoteJSON);
		
		console.log('dataArray', dataArray);
		dataArray.push(addedNoteJSON);
		console.log('updated dataArray', dataArray);

		let newDataString = JSON.stringify(dataArray);
		console.log(newDataString);

		fs.writeFile('./db/db.json', newDataString, function (err) {
			if (err) throw err;
			console.log('Saved!');
		});
	});

	res.sendFile(path.join(__dirname, './db/db.json'));
});

routes.delete('/api/notes/:id', function (req, res) {
	let deleteId = req.params.id;
	console.log(req.params.id);
	
	fs.readFile('./db/db.json', 'utf8', (err, data) => {
		let dataArray = JSON.parse(data);

		dataArray = dataArray.filter(function (note) {
			return note.id != deleteId;
		});

		let newDataString = JSON.stringify(dataArray);

		fs.writeFile('./db/db.json', newDataString, function (err) {
			if (err) throw err;
			console.log('Saved!');
		});
	});

	res.sendFile(path.join(__dirname, './db/db.json'))
});