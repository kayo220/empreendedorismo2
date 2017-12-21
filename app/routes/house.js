module.exports = function(app){
    app.get('/house/insert', function(req, res){
      res.render('house/form',{
        user: req.session.user,
        validationErrors: {},
        districts: app.consts.districts
      });
    });

    app.post('/house/fav', function(req, res){
      var data = req.body;

      var conn = app.infra.connectionFactory();
      var FavsDAO = new app.infra.FavsDAO(conn);

      if(data.add){
        FavsDAO.insert(data.user, data.house, function(){
          res.status(200).send();
        });
      }else{

      }

    });

    app.get('/house/list', function(req, res){
      var conn = app.infra.connectionFactory();
      var houseDAO = new app.infra.HouseDAO(conn);

      if(!req.session.user){
        res.redirect('/login');
        return;
      }

      var username = req.session.user.username;

      houseDAO.list(username, function(snap){
        var userHouses = snap.val();
        res.render('house/list',{
          user: req.session.user,
          houses: userHouses,
          msg: 'Suas Casas'
        })
      })
    });

    app.get('/house/list/all', function(req, res) {
      var conn = app.infra.connectionFactory();
      var houseDAO = new app.infra.HouseDAO(conn);

      houseDAO.listAll(function(snap){
        var result = snap.val();
        var houses = [];

        for(user in result){
          var userHouses = result[user];
          for(house in userHouses){
            userHouses[house].id = house;
            houses.push(userHouses[house]);
          }
        }

        res.render('house/list',{
          user: req.session.user,
          houses: houses,
          msg: 'Casas Disponíveis'
        })
      })
    });

    app.get('/house/view/:owner/:id', function(req, res){
      var id = req.params.id;
      var owner = req.params.owner;
      var username;

      if(req.session.user){
        username = req.session.user.username;
      }



      var conn = app.infra.connectionFactory();
      var houseDAO = new app.infra.HouseDAO(conn);

      houseDAO.searchByID(owner, id, function(snap){
        if(snap.val()){
          var conn = app.infra.connectionFactory();
          var userDAO = new app.infra.UserDAO(conn);
          house = snap.val()[id];
          house.id = id;

          userDAO.searchByUsername(owner, function(snap){
              if(snap.val()){
                  var houseOwner = snap.val()[owner];
                  res.render('house/view',{
                    user: username,
                    house: house,
                    owner:houseOwner
                  })
              }
          });
        }
      })

    });

    app.post('/house/insert', app.uploader.array('photos', 4) ,function(req, res){
      var house = req.body;
      console.log(req.files)
      var photos = [];

      for (var i = 0; i < req.files.length; i++) {
        photos.push('uploads/'+req.files[i].filename);
      }

      house.photos = photos;

      house.owner = req.session.user.username;

      var conn = app.infra.connectionFactory();
      var houseDAO = new app.infra.HouseDAO(conn);

      var id = houseDAO.insert(house);

      res.redirect('/house/list');
    })

}
