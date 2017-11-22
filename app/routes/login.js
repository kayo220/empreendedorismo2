var session =  require('express-session');
var util = require('util');
module.exports = function(app){

    app.get('/login', function(req, res){
        res.render('login/login', {
            tab: 'login',
            validationErrors: {}
        });
    });

    app.post('/login', function(req, res){

        var user = req.body;

        req.assert('usernameLogin', 'Username não pode estar em branco ').notEmpty();        
        req.assert('passwordLogin','Senha não pode estar em branco').notEmpty();

        var errors = req.validationErrors();

        if(errors){
            res.status(400);
            res.render('login/login',{
                validationErrors: errors,
                tab: 'login'
            });
            return;
        }

        var conn = app.infra.connectionFactory();
        var userDAO = new app.infra.UserDAO(conn);

        userDAO.searchByUsername(user.usernameLogin, function(snap){
            if (user.passwordLogin  === snap.val()[user.usernameLogin].password) {

                app.use(session({
                    genid: function(req) {
                        return genuuid()
                    },
                    secret: 'session'
                }))
                res.render('home/home');
            }
		    else {
		        res.render('login/login',{
		            validationErrors: [{msg:'Email e/ou senha errado(s)!'}],
		            tab: 'signup'
		        });
		    }
        });
    });
}