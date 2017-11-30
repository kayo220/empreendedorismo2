module.exports = function(app){

    app.get('/house', function(req, res){
      var conn = app.infra.connectionFactory();
      var houseDAO = new app.infra.HouseDAO(conn);

      houseDAO.list(function(snap){
        res.render('home/list',{
          houses: snap
        })
      })
    });

    app.get('/house/:id', function(req, res){
      var id = req.params.id;
      var conn = app.infra.connectionFactory();
      var houseDAO = new app.infra.HouseDAO(conn);

      houseDAO.searchByID(id, function(snap){
        if(snap.val()){
          res.render('home/home',{
            house:snap[id]
          })
        }
      })

    });

    app.post('/house', function(req, res){
      var house = req.body;

      req.assert('usernameLogin', 'Nome de Usuário não pode estar em branco ').notEmpty();
      req.assert('passwordLogin','Senha não pode estar em branco').notEmpty();

      // if(errors){
      //     res.status(400);
      //     res.render('login/login',{
      //         validationErrors: errors,
      //         tab: 'login'
      //     });
      //     return;
      // }

      var conn = app.infra.connectionFactory();
      var houseDAO = new app.infra.HouseDAO(conn);

      var id = houseDAO.insert(house);

      res.render('home/list',{
        house_id: id
      })
      

    })

}
