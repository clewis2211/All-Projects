var express = require("express");
var path = require("path");
var routeMw = require("./middleware/route.mw");
var api = require("./api");

var app = express();

app.use(express.static(path.join(__dirname, "../client")));

app.use("/api", api);

app.get("*", function(req, res, next) {
    if(routeMw.isAsset(req.url)) {
        next();
    } else {
        res.sendFile(path.join(__dirname, "../client/index.html"));
    }
});

app.listen(3000);