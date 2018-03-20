var express = require("express");
var books = require("./controllers/books.ctrl");

var router = express.Router();

router.use("/books", books);

module.exports = router;