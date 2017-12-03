var express = require("express");
var expressLoad = require("express-load");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var session = require("express-session");
var cookieParser = require('cookie-parser');

module.exports = function(){
    var app = express();

    app.use(express.static("./app/public"));
    app.set("view engine", "ejs");
    app.set("views", "./app/views");

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(expressValidator());

    app.use(cookieParser());
    app.use(session({
        secret: 'dakamo',
        resave: false,
        saveUninitialized: true,
      }));

    expressLoad("routes", {cwd:"app"})
        .then("infra")
        .into(app);


    app.use(function(req, res, next){
        if (process.env.NODE_ENV == "production") {
            res.status(404).render("errors/404");
            next();
        }else{
            next();
        }
    });

    app.use(function(error, request, response, next){ //Called first if error occurs
        if (process.env.NODE_ENV == "production") {
            response.status(500).render("errors/500");
            return;
        }
        next(error);
   });


    return app;
}
