module.exports = function(app){
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
            res.render('login/login',{
                validationErrors: errors,
                tab: 'signup'
            });
            return;
        }
        
        var conn = app.infra.connectionFactory();
        var userDAO = new app.infra.UserDAO(conn);
        
        userDAO.searchByUsername(user.username, function(snap){
            if(!snap.val()){
                userDAO.insert(user, function(err){
                    res.redirect('/login');
                });
            }else{
                res.render('login/login',{
                    validationErrors: [{msg:'Nome de usuário já existe'}],
                    tab: 'signup'
                });
            }
        });
        
    });

}