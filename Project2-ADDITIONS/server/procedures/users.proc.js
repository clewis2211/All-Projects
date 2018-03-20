var db = require("../config/db");

exports.all = function() {
    return db.rows('GetUsers', []);
};

exports.read = function(id) {
    return db.row('GetUser', [id]);
};

exports.write = function(user, hash) {
    return db.empty('InsertUser', [user.firstname, user.lastname, user.email, hash]);
};

exports.update = function(user) {
    return db.empty('UpdateUser', [user.id, user.firstname, user.lastname]);
};

// exports.updatePassword = function(id, password) {
//     return db.empty('UpdatePassword', [id, password]);
// }

exports.readByEmail = function(email) {
    return db.row('GetUserByEmail', [email]);
};

exports.delete = function(id) {
    return db.empty('DeleteUser', [id]);
};