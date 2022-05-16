const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const feedbackRoute = require("./routes/feedback");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("DB Connection is Successful"))
    .catch((err) => {
        console.log(err);
    });

app.use("/", feedbackRoute);

app.listen(process.env.PORT, ()=>{
    console.log("Backend Server is Running");
});