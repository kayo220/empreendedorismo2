function UserDAO(database){
    this._collection = database.ref('houses');
}


UserDAO.prototype.insert = function(house){
   return this._collection.push(house).key;
}

UserDAO.prototype.list = function (callback){
    this._collection
    .once('value')
    .then(callback);
}

UserDAO.prototype.searchByID = function(id, callback){
    this._collection
    .orderByKey()
    .equalTo(id)
    .once('value')
    .then(callback);
}

module.exports = function(){
    return UserDAO;
}
