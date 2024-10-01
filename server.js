const express =  require('express');
const app = express();
const dotenv = require("dotenv") ;

dotenv.config();
const port =  3000;

const username = process.env.DB_USERNAME;
const dbname = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;
const localhost = process.env.DB_HOST
var mysql = require('mysql2');

var con = mysql.createConnection({
    host: localhost,
    user: username,
    password:password,
    database: dbname
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

// Question 1 goes here
  app.get("/patients", async(req, resp) => {
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT patient_id, first_name, last_name, date_of_birth FROM patients;", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          resp.send(result);
        });
      });
  })

// Question 2 goes here
  app.get("/providers", async(req, resp) => {
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT first_name, last_name, provider_specialty FROM providers;", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          resp.send(result);
        });
      });
  })

// Question 3 goes here
  app.get("/patientsfirstname", async(req, resp) => {
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM patients ORDER BY first_name;", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          resp.send(result);
        });
      });
  })

// Question 4 goes here
  app.get("/providersspeciality", async(req, resp) => {
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT first_name, last_name, provider_specialty FROM providers ORDER BY provider_specialty;", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          resp.send(result);
        });
      });
  })

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})