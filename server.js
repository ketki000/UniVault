const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mySqlPool = require("./config/db");

//configure
dotenv.config();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/v1/student", require("./routes/studentsRoutes"));
app.get("/test", (req, res) => {
  res.status(200).send("<h1> Welcome to Nodejs Mysql APP!</h1>");
});

//port
//const PORT = 8080;
const PORT = process.env.PORT || 8000;

//conditionally listen
mySqlPool
  .query("SELECT 1")
  .then(() => {
    //MYSQL
    console.log("Mysql db connected".bgCyan.white);
    //listen
    app.listen(PORT, () => {
      console.log(`Server Running on port ${process.env.PORT}`.bgGreen.white);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//listen
// app.listen(PORT,()=>{
//     console.log(`Server Running on port ${process.env.PORT}`.bgGreen.white);
// });
