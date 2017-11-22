var util = require('util');
function UserDAO(database){
    this._collection = database.ref('users');
}


UserDAO.prototype.insert = function(user, callback){
   this._collection.child(user.username).set(user);
   callback();
}

UserDAO.prototype.list = function (callback){
    this._collection
    .once('value')
    .then(callback);
}

UserDAO.prototype.searchByUsername = function(username, callback){
    this._collection
    .orderByKey()
    .equalTo(username)
    .once('value')
    .then(callback);
}

module.exports = function(){
    return UserDAO;
}