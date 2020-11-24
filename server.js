const express = require("express");

let app = express();
let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

let notes = require("./db/db.json");


//start server

app.listen(PORT, function() {
  console.log("App listening on PORT: http://localhost" + PORT);
});