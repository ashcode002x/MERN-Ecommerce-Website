const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect(
    "mongodb+srv://devsaurav:Saurav%40620686@cluster0.lxfgxe1.mongodb.net/quickcart"
);

// API creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

app.listen(port, (error) => {
    if (!error) {
        console.log("server running on port " + port);
    } else {
        console.log("Error : " + error);
    }
});
