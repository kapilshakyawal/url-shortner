require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()


app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({extended:true}))
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://watch-ecomm-frontend.onrender.com/');
//     next();
//   });
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    maxAge: 3600
  })
);
// app.use(cors())
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.json({extended : true}))
// parse application/json
// app.use(bodyParser.json())
// app.use(bodyParser.json({extended:true}))

mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Db is connected successfully...");
    // If connection is successful, start the server.
    // app.listen(process.env.PORT || 7000);
  })
  .catch((error) => {
    console.log(error);
  });


  const url = require("./router/urlRouter")
  app.use("", url)


app.listen(process.env.PORT , () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})