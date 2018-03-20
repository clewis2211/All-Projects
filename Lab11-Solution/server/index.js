//IMPORT ALL OUR NODE MODULES
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var fs = require("fs");

//IMPORT EXPRESS
var app = express();

//SET UP OUR PATH VARIABLES FOR EASE-OF-ACCESS
var clientPath = path.join(__dirname, "../client");
var jsonPath = path.join(__dirname, "data.json");

//SET UP OUR STATIC FILE-SERVING
app.use(express.static(clientPath));
//SET UP OUR BODY-PARSER FOR INCOMING JSON
app.use(bodyParser.json());

//SET UP OUR ROUTE FOR /API/CHIRPS
app.route("/api/chirps")
//IF SOMEONE IS SENDING A 'GET' REQUEST TO OUR ROUTE
    .get(function (req, res) {
        //SEND BACK THE DATA.JSON FILE
        res.sendFile(jsonPath);
    })
    //OTHERWISE, IF SOMEONE IS SENDING A 'POST' REQUEST TO OUR ROUTE
    .post(function (req, res) {
        //READ THE DATA.JSON FILE
        fs.readFile(jsonPath, "utf8", function (err, data) {
            if (err) {
                //IF THERE'S AN ERROR: RESPOND WITH A 500 ERROR
                res.sendStatus(500).send("ERROR! Could not read Chirps from the file!");
            } else {
                //OTHERWISE PARSE THE ARRAY OF CHIRPS FROM DATA.JSON
                var chirps = JSON.parse(data);
                var newChirp = req.body; //TODO: THIS IS NOT WORKING FOR SOME REASON...
                //AND ADD OUR NEWLY RECEIVED CHIRP (IN THE POST REQUEST) TO THE ARRAY
                chirps.push(newChirp);
                //AND WRITE THIS UPDATED ARRAY TO THE DATA.JSON FILE
                fs.writeFile(jsonPath, JSON.stringify(chirps), function (err) {
                    if (err) {
                        res.sendStatus(500).send("ERROR! Could not write Chirp to the file!");
                    } else {
                        //IF ALL WAS SUCCESSFUL, RETURN WITH A RESPONSE OF 'ACCEPTED'
                        res.sendStatus(201);
                    }
                })
            }
        });
    });

//LISTEN ON PORT 3000
app.listen(3000);