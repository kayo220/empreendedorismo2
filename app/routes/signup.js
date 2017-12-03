module.exports = function(app){
    app.get('/signup', function(req, res){
      res.render('signup/form',{
        validationErrors:{}
      });
    });
    
    app.post('/signup', function(req, res){
        var user = req.body;


        req.assert('name', 'Seu nome não pode estar em branco').notEmpty();
        req.assert('username', 'Seu nome de usuário não pode estar em branco').notEmpty();
        req.assert('email', 'Email inválido').isEmail();
        req.assert('password','Escolha uma senha').notEmpty();
        req.assert('birthdate','Data inválida').notEmpty();
        req.assert('smoker','Você é fumante?').notEmpty();
        req.assert('alcohol','Você é consome álcool?').notEmpty();
        req.assert('children','Você tem filhos?').notEmpty();
        req.assert('pets','Você tem animais de estimação?').notEmpty();

        var errors = req.validationErrors();

        if(errors){
            res.status(400);
            res.render('signup/form',{
                validationErrors: errors
            });
            return;
        }
        var conn = app.infra.connectionFactory();
        var userDAO = new app.infra.UserDAO(conn);

        userDAO.searchByUsername(user.username, function(snap){
            if(!snap.val()){
                userDAO.insert(user, function(err){
                    req.session.user = user;
                    res.redirect('/');
                });
            }else{
                res.render('signup/form',{
                    validationErrors: [{msg:'Nome de usuário já existe'}]
                });
            }
        });

    });

}
