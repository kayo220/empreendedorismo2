function UserDAO(database){
    this._collection = database.ref('users');
    this._database = database;
}


UserDAO.prototype.insert = function(user, callback){
   this._collection.child(user.username)
   .set(user)
   .then(callback);
}

UserDAO.prototype.addFav = function(username, owner, house, callback){
  this._collection.child(username)
  .child('favs')
  .child(owner)
  .child(house)
  .set('')
  .then(callback)
}

UserDAO.prototype.rmFav = function(username, owner, house, callback){
  this._collection.child(username)
  .child('favs')
  .child(owner)
  .child(house)
  .remove()
  .then(callback)
}

UserDAO.prototype.lsFav = function (username, callback){
    this._collection.child(username)
    .child('favs')
    .once('value')
    .then(callback);
}

UserDAO.prototype.favStatus = function (user, owner, house, callback){
    this._collection.child(user)
    .child('favs')
    .child(owner)
    .child(house)
    .once('value')
    .then(callback);
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
