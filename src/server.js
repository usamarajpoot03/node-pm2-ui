const express = require("express");
const fs = require('fs')

const path = require('path');

var app = express();
const cors = require("cors");
app.use(cors());
const errorHandler = require("./routes/middlewares/errorHandler");
const { reject } = require("lodash");

app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));


app.get('/', function(req,res) {
  res.render("index", { title: "Home" });
});

app.get('/logout', function(req,res) {
  res.render("index", { title: "Home" });
});

app.get("/user", (req, res) => {
  res.render("user", { title: "Profile", userProfile: { nickname: "Auth0" } });
});

app.get("/logs",async (req, res) => {
  const fileContent  =  await readTextFile(  path.resolve(__dirname , '../errorLogFile.log'));
  res.render("logs", { title: "Profile", logs: fileContent });
});


app.get("/api/test",   require('./routes/api/demo.controller'))

async function readTextFile(filepath)
{
  return new Promise((resolve, reject)=>{
  fs.readFile(filepath, 'utf8' , (err, data) => {
    if (err) {
     reject(err);
    }
    resolve(data);
  })
})

}


app.use(errorHandler);
const PORT = process.env.PORT || 8000 ;

app.listen(PORT, () => {
  console.log("Server Listening on port : ", PORT);
});

