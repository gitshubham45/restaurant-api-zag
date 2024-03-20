const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require("./routes/userRoutes");
const listingRoutes = require("./routes/listingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const path = require('path');


const app = express();
dotenv.config();

connectDB();


app.use(express.json());


app.get('/', async(req,res)=>{
    res.send("Hello, world!");
})

app.use("/api/user", userRoutes);
app.use("/api/listing", listingRoutes);
app.use("/api/review", reviewRoutes);





const port = process.env.PORT || 3000;
app.listen(port, console.log("server listening on port", port));

