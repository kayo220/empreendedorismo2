module.exports = function(app){
    app.get('/login', function(req, res) {
        res.render('login/form',{
          user: req.session.user,
          validationErrors: {}
        });
    });

    app.post('/login', function(req, res){
        var user = req.body;



        var conn = app.infra.connectionFactory();
        var userDAO = new app.infra.UserDAO(conn);

        userDAO.searchByUsername(user.usernameLogin, function(snap){
            if(snap.val()){
                var dbuser = snap.val()[user.usernameLogin];
                if (user.passwordLogin  === dbuser.password) {
                    req.session.user = dbuser;
                    res.redirect('/house/list');
                    return;
                }
            }

            res.status(400).render('login/form',{
              user: req.session.user,
              validationErrors: [{msg:'Nome de usuário ou senha incorreto'}]
            });
        });
    });
}
