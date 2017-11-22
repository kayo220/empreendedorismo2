var session =  require('express-session');
var util = require('util');
module.exports = function(app){

    app.get('/loggout', function(req, res){
        res.render('home/home', {
            validationErrors: {}
        });
    });

    app.post('/loggout', function(req, res){
       //console.log(req);
        //console.log(req.session);
        //req.session.destroy(function(err) {
            res.render('login/login', {
                validationErrors: [{}],
                tab:  'login'
            });
        //})
    });
}