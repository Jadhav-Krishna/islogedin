const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const path = require('path');
const jwt =  require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.set("view engine","ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/",(req,res)=>{
    res.send("hellow world :)")
})

app.listen(3000,a => {
    console.log("Server is running on port 3000")
})