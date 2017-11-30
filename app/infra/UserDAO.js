function UserDAO(database){
    this._collection = database.ref('users');
    this._database = database;
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
    console.log(this._collection.numChildren())
    this._collection
    .orderByKey()
    .equalTo(username)
    .once('value')
    .then(callback);
}

module.exports = function(){
    return UserDAO;
}
