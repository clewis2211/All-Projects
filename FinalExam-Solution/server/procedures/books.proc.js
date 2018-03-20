var db = require("../config/db");

exports.all = function() {
    return db.rows("GetAllBooks", []);
}

exports.single = function(id) {
    return db.row("GetSingleBook", [id]);
}