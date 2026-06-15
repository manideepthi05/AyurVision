const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req,res)=>{
    res.send("Planty Backend Running");
});

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

    console.log("MongoDB Connected");

    app.listen(process.env.PORT,()=>{

        console.log("Server Running On Port 5000");

    });

})
.catch(err=>console.log(err));