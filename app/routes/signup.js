module.exports = function(app){
    app.get('/signup', function(req, res){
      res.render('signup/form',{
        user: req.session.user,
        validationErrors:{},
        districts: app.consts.districts
      });
    });

    app.post('/signup', app.uploader.single('profile_picture') ,function(req, res){
        var user = req.body;
        var errors = req.validationErrors();

        if(errors){
            res.status(400);
            res.render('signup/form',{
              user: req.session.user,
              validationErrors:{},
              districts: app.consts.districts
            });
            return;
        }
        var conn = app.infra.connectionFactory();
        var userDAO = new app.infra.UserDAO(conn);

        userDAO.searchByUsername(user.username, function(snap){
            if(!snap.val()){
              user.profile_picture = req.file.path;
              userDAO.insert(user, function(err){
                req.session.user = user;
                res.redirect('/');
              });
            }else{
                res.render('signup/form',{
                    user: req.session.user,
                    validationErrors: [{msg:'Nome de usuário já existe'}]
                });
            }
        });

    });

}
