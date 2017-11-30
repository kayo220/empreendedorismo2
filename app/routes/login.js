module.exports = function(app){
    app.post('/login', function(req, res){

        var user = req.body;
        console.log(user)

        req.assert('usernameLogin', 'Nome de Usuário não pode estar em branco ').notEmpty();
        req.assert('passwordLogin','Senha não pode estar em branco').notEmpty();

        var errors = req.validationErrors();

        if(errors){
          res.status(400).redirect('login.html?failed=true');
            return;
        }

        var conn = app.infra.connectionFactory();
        var userDAO = new app.infra.UserDAO(conn);

        userDAO.searchByUsername(user.usernameLogin, function(snap){
            if(snap.val()){
              console.log(snap.val())
                var dbuser = snap.val()[user.usernameLogin];
                if (user.passwordLogin  === dbuser.password) {
                    req.session.user = dbuser;
                    res.redirect('/');
                    return;
                }
            }
            res.status(400).redirect('login.html?failed=true');
        });
    });
}
