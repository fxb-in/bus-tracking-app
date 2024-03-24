const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport= require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt= require("jsonwebtoken");

const app= express();
const port= 8000;
const cors= require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(passport.initialize());


mongoose.connect(
    "mongodb+srv://fathima:fathimabee@cluster0.clhhyhg.mongodb.net/",
    {
        
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connected to mongodb");
})
.catch((err) => {
          console.log("error connecting to mongodb",err);
});

app.listen(port, () => {
    console.log("server running on port 8000");
});
const User = require("./models/user");

app.post("/register", (req, res) => {
    const { name, email, password} = req.body;
  
    // create a new User object
    const newUser = new User({ name, email, password});
    newUser
    .save()
    .then(() => {
      res.status(200).json({ message: "User registered successfully" });
    })
    .catch((err) => {
      console.log("Error registering user", err);
      res.status(500).json({ message: "Error registering the user!", err });
    });
});
