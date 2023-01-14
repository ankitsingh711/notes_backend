const express = require("express");
const app = express();
const { connection } = require("./config/db");
const { UserRouter } = require("./router/user.router");
const { NoteRouter } = require("./router/notes.router");
const { Auth } = require("./middleware/auth.middleware");
// const cors = require("cors");
require("dotenv").config();



app.use(express.json());
// app.use(cors())
app.use("/users", UserRouter);
app.use(Auth);
app.use("/notes", NoteRouter);


let port = process.env.PORT;
app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (error) {
    console.log(error);
    res.send("Something went wrong while connecting to the DB");
  }
  console.log(`Server is running on the port ${port}`);
});
