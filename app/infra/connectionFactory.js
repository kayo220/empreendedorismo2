var firebase = require('firebase-admin');
var serviceAccount = require("./key.json");

var conn = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://dakamo-e06ba.firebaseio.com"
}).database();

function getConnection(){
    conn.goOnline;
    return conn;
}

module.exports = function(){
    return getConnection;
}