const { response } = require("express");
const mysql = require('mysql');
const env = require('../env.js');
const config = require('../dbconfig.js')[env];
 
const login = async (req, res = response) => {
  const { email, password } = req.body;
 
  let dbcon = mysql.createConnection(config);
  let QUERY = "SELECT * FROM users WHERE email = ?";
 
  dbcon.query(QUERY, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        msg: "An error occurred while processing your request.",
      });
    }
 
    if (result.length === 0) {
      return res.status(400).json({
        msg: "User not found",
      });
    }
 
    // Here you might want to compare the password from the database with the hashed password from the request
    // For demonstration purpose, I'll assume the password comparison happens here
 
    if (password !== "1234") {
      return res.status(400).json({
        msg: "User / Password are incorrect",
      });
    }
 
    // If password is correct, you can send back the response
    res.json({
      name: result[0].name_first + " " + result[0].name_last,
      token: "A JWT token to keep the user logged in.",
      msg: "Successful login",
    });
  });
};
 
module.exports = {
  login,
};
 