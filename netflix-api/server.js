const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

//connect to MongoDB
const dbURI = `mongodb+srv://${process.env.USER_MONGODB}:${process.env.PASS_MONGODB}@cluster0.j5qrbeo.mongodb.net/dbnetflix?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", userRoutes);

app.listen(process.env.PORT, console.log("Server is started"));
