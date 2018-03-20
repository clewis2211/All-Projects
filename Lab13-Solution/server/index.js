var express = require("express");
var mongo = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;
var bodyParser = require("body-parser");

var app = express();

app.use(express.static(__dirname + "/../client"));
app.use(bodyParser.json());

var db;
mongo.connect("mongodb://localhost:27017/pizzaPlanet", function(err, connection) {
    if(err) {
        console.log(err);
    } else {
        db = connection;
    }
});

app.route("/api/locations")
    .get(function(req, res) {
        db.collection("locations").find().toArray(function(err, locs) {
            if(err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.send(locs);
            }
        });
    }).post(function(req, res) {
        db.collection("locations").insertOne(req.body, function(err, result) {
            if(err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.send(result);
            }
        })
    });

app.route("/api/locations:id")
    .get(function(req, res) {
        
    })

app.route("/api/locations/:id/reviews")
    .get(function(req, res) {
        // console.log(req.params.id);
        var o = new ObjectId(req.params.id);
        var loc = db.collection("locations").findOne({_id: o});
        res.send(loc);
        // .toArray(function(err, loc) {
        //     if(err) {
        //         console.log(err);
        //         res.sendStatus(500);
        //     } else {
        //         res.send(loc);
        //     }
        // });
    })    

app.listen(3000);    