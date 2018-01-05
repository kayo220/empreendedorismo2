var express = require("express");
var expressLoad = require("express-load");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var session = require("express-session");
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer({limits: {fileSize: 2000000 },dest:'./app/public/uploads/'});
var path = require('path');

module.exports = function(){
    var app = express();
    app.uploader = upload;
    app.use(express.static(path.join(__dirname, '..','app', 'public')));
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, '..','app', 'views'));

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

    app.consts = {}
    app.consts.districts = ['Nenhum','35º BI', 'Aeroporto', 'Asa Branca', 'Aviário', 'Baraúnas', 'Brasília', 'Calumbi', 'Campo Limpo', 'Caseb', 'Capuchinhos', 'Campo do Gado Novo', 'Chácara São Cosme', 'Cidade Nova', 'CIS', 'Conceição', 'Feira IV', 'Feira V', 'Feira VI', 'Feira VII', 'Feira IX', 'Feira X', 'Gabriela', 'Jardim Acácia', 'Jardim Cruzeiro', 'Lagoa Grande', 'Limoeiro', 'Muchila', 'Nova Esperança', 'Novo Horizonte', "Olhos D'Água", 'Papagaio', 'Parque Getúlio Vargas', 'Parque Ipê', 'Pedra do Descanso', 'Ponto Central', 'Queimadinha', 'Rua Nova', 'Santa Mônica', 'Santo Antônio dos Prazeres', 'São João', 'Sobradinho', 'Sim', 'Subaé']

    return app;
}
