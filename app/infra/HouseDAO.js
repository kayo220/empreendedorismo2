function HouseDAO(database, username){
    this._collection = database.ref('houses');
}


HouseDAO.prototype.insert = function(house){
   return this._collection.child(house.owner).push(house).key;
}

HouseDAO.prototype.list = function(owner, callback){
    this._collection
    .child(owner)
    .once('value')
    .then(callback);
}

HouseDAO.prototype.listAll = function (callback){
    this._collection
    .once('value')
    .then(callback);
}

HouseDAO.prototype.searchByID = function(owner,id){
    return this._collection
    .child(owner)
    .orderByKey()
    .equalTo(id)
    .once('value');
}

module.exports = function(){
    return HouseDAO;
}
