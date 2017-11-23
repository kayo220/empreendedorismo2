module.exports = function(app){

    app.get('/login', function(req, res, next){
        if(req.session.user){
            res.redirect('/')
        }
        else{
            res.render('login/login', {
                tab: 'login',
                validationErrors: {}
            });
    }
    });

    app.post('/login', function(req, res){

        var user = req.body;

        req.assert('usernameLogin', 'Nome de Usuário não pode estar em branco ').notEmpty();        
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
            if(snap.val()){
                var dbuser = snap.val()[user.usernameLogin];
                if (user.passwordLogin  === dbuser.password) {
                    req.session.user = dbuser;
                    res.redirect('/');
                    return;
                }
            }
            res.render('login/login',{
                validationErrors: [{msg:'Email e/ou senha errado(s)!'}],
                tab: 'login'
            });
        });
    });
}