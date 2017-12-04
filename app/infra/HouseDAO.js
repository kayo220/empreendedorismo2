function HouseDAO(database, username){
    this._collection = database.ref('houses');
    this._personal = database.ref('houses/'+username);
}


HouseDAO.prototype.insert = function(house){
   return this._collection.child(house.owner).push(house).key;
}

HouseDAO.prototype.list = function (callback){
    this._collection
    .once('value')
    .then(callback);
}

HouseDAO.prototype.searchByID = function(id,callback){
    this._personal
    .orderByKey()
    .equalTo(id)
    .once('value')
    .then(callback);
}

module.exports = function(){
    return HouseDAO;
}
