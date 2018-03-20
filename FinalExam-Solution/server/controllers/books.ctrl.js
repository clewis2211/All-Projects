var express = require("express");
var proc = require("../procedures/books.proc");

var router = express.Router();

router.get("/", function(req, res) {
    proc.all().then(function(success) {
        res.send(success);
    }, function(err) {
        console.log(err);
        res.status(500).send(err);
    })
})

router.get("/:id", function(req, res) {
    proc.single(req.params.id).then(function(success) {
        res.send(success);
    }, function(err) {
        console.log(err);
        res.status(500).send(err);
    })
})

module.exports = router;