const { response } = require("express");

const mysql = require('mysql');

const env = require('../env.js');

const config = require('../dbconfig.js')[env];

const login = async (req, res = response) => {

  const { email, password } = req.body;

  let dbcon = mysql.createConnection(config);

  let QUERY = "SELECT * FROM users WHERE email = ?";

  dbcon.query(QUERY, [email], (err, results) => {

    if (err) {

      console.error("Database error:", err);

      return res.status(500).json({ msg: "Database error" });

    }

    if (results.length === 0) {

      return res.status(400).json({ msg: "User not found" });

    }

    const user = results[0];

    // Check hashed password here

    if (password !== user.password) {

      return res.status(400).json({ msg: "Invalid password" });

    }

    // Authentication successful, generate token, etc.

    res.json({

      name: user.name,

      token: "A JWT token to keep the user logged in.",

      msg: "Successful login",

    });

  });

};

module.exports = {

  login,

};