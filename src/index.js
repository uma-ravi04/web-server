const express = require("express");
const { getUser, createUser } = require("./controller/index");
const url = require('url');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())

app.get("/user/:id", (req, res) => {
  const id = req.params.id;  
  getUser(id, res).catch(console.dir);
});

app.post("/user", (req, res) => {
  const body = req.body;
  const id = body && body._id || '';
  console.log(body, "bdy")
  createUser(id, body, res).catch(console.dir);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});