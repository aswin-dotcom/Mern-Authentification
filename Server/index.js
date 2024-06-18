const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt=require('jsonwebtoken');

const PORT = 3500;
const cors = require("cors");
const mongoose = require("mongoose");
const Register = require("./Register");

const bodyParser = require("body-parser");

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
const corsOption = {
  origin: "https://spiffy-capybara-b8f733.netlify.app/",
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
const connection = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};
connection()
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => console.log("db not connected", error.message));

app.get("/", (req, res) => {
  res.status(200).json({ working: "yeah its working" });
});
const register = async (req, res) => {
  //
  const { Username, DOB, email, password } = req.body;

  if (!Username) {
    return res.status(200).json({ error: "Enter a Username" });
  }
  const Userexist = await Register.findOne({ Username: Username });
  if (Userexist) {
    return res.status(200).json({ error: "Username already taken" });
  }

  if (!DOB) {
    return res.status(200).json({ error: "Enter DOB" });
  }

  if (!password || password.length < 6) {
    return res
      .status(200)
      .json({ error: "Enter a password with more than 6 characters" });
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const exist = await Register.findOne({ email: email });

  if (exist) {
    return res.status(200).json({ error: "email already taken" });
  }
  if (email === null || email === "") {
    return res.status(200).json({ error: "enter a email id" });
  }

  // console.log(email);
  // console.log(req.body);

  const UserRegister = await Register.create({
    Username: Username,
    email: email,
    DOB: DOB,
    password: hashedPassword,
  });

  return res.status(200).json({ success: "successfully register" });
};
app.post("/register", register);
const login = async (req, res) => {
  const { Username, password } = req.body;

  try {
    // Check if the username exists in the database
    const nameexist = await Register.findOne({ Username: Username });

    if (!nameexist) {
      // If username does not exist, return an error response
      return res.status(200).json({ error: "Username Invalid" });
    }

    // Check if the password matches the hashed password stored in the database
    const passwordmatch = await bcrypt.compare(password, nameexist.password);

    if (passwordmatch) {
      // If password matches, generate a JWT token and send it as a response
      const token = jwt.sign({ name: nameexist.Username }, process.env.JWT_SECRET);
      return res.status(200).json({ token: token ,message: "login successfull"});
    } else {
      // If password does not match, return an error response
      return res.status(200).json({ error: "Invalid password" });
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

app.post("/login", login);
const details = async (req, res) => {
  try {
    const d = await Register.find();
    console.log(d);
    res.status(200).json(d);
  } catch (err) {
    res.status(200).json({ error: "Server Error" });
  }
};
app.get("/details", details);

const dashboard = async(req,res) =>{
  const authHeader =  req.headers['authorization'];//variable for Authorization in headers
  const token = authHeader && authHeader.split(' ')[1];//[Bearer,jnkssvvkvfhb];arr[1]=>token
  if(token){
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
      if(err){
        console.log(err);
      }
      res.json({decoded});
    })

  }

}
app.get("/validation",dashboard);



