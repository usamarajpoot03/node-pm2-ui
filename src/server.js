const express = require("express");
const path = require('path');

var app = express();
const cors = require("cors");
app.use(cors());
const errorHandler = require("./routes/middlewares/errorHandler");

app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));


app.get("/user", (req, res) => {
  res.render("user", { title: "Profile", userProfile: { nickname: "Auth0" } });
});

app.use('/', function(req,res) {
  res.render("index", { title: "Home" });
});



app.use("/api/test",   require('./routes/api/demo.controller'))

app.use(errorHandler);
const PORT = process.env.PORT || 8000 ;

app.listen(PORT, () => {
  console.log("Server Listening on port : ", PORT);
});

