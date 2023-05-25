const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
// note: any code in a module is executed immediatly on calling require with no variable
// require('./db/connect')
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middlewere/notfound")


//middleware
app.use(express.static('./public'))
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);
  // below is the responce for a 404
app.use(notFound)

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
