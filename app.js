const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  let { username, email, password, age } = req.body;
  bcrypt.genSalt(11, function(err, salt) {
    bcrypt.hash(password, salt, async (err, hash) => {
        let createdUser = await userModel.create({
          username,
          email,
          password : hash,
          age,
        });
        let token = jwt.sign({email},"key Hai , gand Thodi Na Jo Ghur-Ghur Ke Dekh Raha Hai");
        res.cookie("token",token);
        res.send(createdUser);
      });
    });
});

app.get("/login", (req,res) =>{
    res.render("login")
})

app.post("/login", async (req,res) =>{
    let user = await userModel.findOne({email:req.body.email});
    if (!user) return res.send("Something went wrong :(")
    console.log(user)

    bcrypt.compare(req.body.password , user.password , (err,result) => {
        if(result) {
            let token = jwt.sign({email:user.email},"key Hai , gand Thodi Na Jo Ghur-Ghur Ke Dekh Raha Hai");
            res.cookie("token",token);
            return res.send("yes!!! you logedin :)")
        }
        else return res.send("Something went wrong :(")
    })
})

app.post("/logout",(req,res)=>{
    res.cookie("token","");
    res.redirect("/");
})

app.listen(3000, (a) => {
  console.log("Server is running on port 3000");
});
