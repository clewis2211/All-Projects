//IMPORT ALL OUR NODE MODULES
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var fs = require("fs");
var mysql = require("mysql");

//IMPORT EXPRESS
var app = express();

//SET UP OUR PATH VARIABLES FOR EASE-OF-ACCESS
var clientPath = path.join(__dirname, "../client");

//SET UP OUR STATIC FILE-SERVING
app.use(express.static(clientPath));
//SET UP OUR BODY-PARSER FOR INCOMING JSON
app.use(bodyParser.json());

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'chirpuser2',
  password        : 'password',
  database        : 'Chirper2'
});

//FUNCTION TO SEND A MYSQL QUERY DEPENDENT ON THE METHOD
function sendQuery(method, values) {
    return new Promise(function(fulfill, reject) {
        pool.getConnection(function(err, connection) {
            if(err) {
                reject(err);
            } else {
                var queryString;
                switch(method) {
                    case "GET_SINGLE":
                        queryString = "CALL GetSingleChirp(?)";
                        break;
                    case "INSERT":
                        queryString = "CALL InsertChirp(?, ?)";   
                        break;
                    case "UPDATE":
                        queryString = "CALL UpdateChirp(?, ?)";
                        break;
                    case "DELETE":
                        queryString = "CALL DeleteChirp(?)";
                        break; 
                    case "GET_USERS":
                        queryString = "SELECT * FROM Users";
                        break;    
                    default:     
                        queryString = "CALL GetAllChirps()";
                        break;       
                }
                connection.query(queryString, values, function(err, resultSets) {
                    connection.release();
                    if(err) {
                        reject(err);
                    } else {
                        fulfill(resultSets);
                    }
                })
            }
        })
    })
}

//SET UP OUR ROUTE FOR /API/CHIRPS
app.route("/api/chirps")
//IF SOMEONE IS SENDING A 'GET' REQUEST TO OUR ROUTE
    .get(function (req, res) {
        sendQuery("GET_ALL", []).then(function(data) {
            res.send(data[0]);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        })
    })
    //OTHERWISE, IF SOMEONE IS SENDING A 'POST' REQUEST TO OUR ROUTE
    .post(function (req, res) {
        //SEND A MYSQL QUERY THAT HAS VALUES EQUAL TO THE MESSAGE/USER PROPERTIES POSTED TO US
       sendQuery("INSERT", [req.body.message, req.body.userId]).then(function(data) {
           res.status(201).send(data);
       }, function(err) {
           console.log(err);
           res.sendStatus(500);
        })
    });

 //SET UP OUR ROUTE FOR /API/USERS
 app.route("/api/users")
    .get(function(req, res) {
        sendQuery("GET_USERS", []).then(function(data) {
            res.send(data);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        })
    });   

//SET UP OUR ROUTE FOR /API/CHIRPS:ONECHIRP
app.route("/api/chirps/:id")
    .get(function(req, res) {
        //SEND A MYSQL QUERY THAT GETS A SINGLE CHIRP WITH A GIVEN ID
        sendQuery("GET_SINGLE", [req.params.id]).then(function(data) {
            res.send(data[0]);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        })
    }).put(function(req, res) {
        sendQuery("UPDATE", [req.body.message]).then(function(data) {
            res.sendStatus(204);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        })
    }).delete(function(req, res) {
        sendQuery("DELETE", [req.params.id]).then(function(data) {
            res.sendStatus(204);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        })
    });

//LISTEN ON PORT 3000
app.listen(3000);