const express = require("express");
// const x = require("./routes/apiRoute")
const routes = require("./routes/apiRoute");
const path = require("path");


let app = express();
let PORT = process.env.PORT || 3000;

//middle
app.use((req,res,next)=>{
  console.log(req.url, res.statusCode )
  next()
})
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', routes);
//ends
app.get("/notes", (req,res)=>{
  res.sendFile(path.join(__dirname, './public/notes.html'));
})


app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//start server

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});  

