function FavsDAO(database, username){
    this._collection = database.ref('favs');
}


FavsDAO.prototype.insert = function(owner, house){
   return this._collection.child(owner).push(house).key;
}

FavsDAO.prototype.list = function(owner, callback){
    this._collection
    .child(owner)
    .once('value')
    .then(callback);
}

FavsDAO.prototype.listAll = function (callback){
    this._collection
    .once('value')
    .then(callback);
}

FavsDAO.prototype.searchByID = function(owner,id,callback){
    this._collection
    .child(owner)
    .orderByKey()
    .equalTo(id)
    .once('value')
    .then(callback);
}

module.exports = function(){
    return FavsDAO;
}
