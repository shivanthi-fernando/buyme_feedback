const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const feedbackRoute = require("./routes/feedback")

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("DB Connection is Successful"))
    .catch((err) => {
        console.log(err);
    });

app.use("/api/feedback", feedbackRoute);

app.listen(process.env.PORT ||5001, ()=>{
    console.log("Backend Server is Running");
});