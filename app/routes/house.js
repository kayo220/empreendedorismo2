const url = require('url');

module.exports = function(app){
    app.get('/house/insert', function(req, res){
      res.render('house/form',{
        user: req.session.user,
        validationErrors: {},
        districts: app.consts.districts
      });
    });

    app.get('/house/list', function(req, res){
      var conn = app.infra.connectionFactory();
      var houseDAO = new app.infra.HouseDAO(conn);

      if(!req.session.user){

        res.redirect(url.format({
          pathname: '/login',
          query:{
            msg: 'Antes de ver suas casas, você precisa fazer o login',
            redir: '/house/list'
          }
        }));

        return;
      }

      var username = req.session.user.username;

      houseDAO.list(username, function(snap){
        var userHouses = snap.val();
        for(i in userHouses){
          userHouses[i].id = i;
        }
        res.render('house/list',{
          user: req.session.user,
          houses: userHouses,
          msg: 'Suas Casas',
          districts: app.consts.districts
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
          msg: 'Casas Disponíveis',
          districts: app.consts.districts
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
                    user: req.session.user,
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
    });

    app.post('/house/fav/insert', function(req, res){
      var data = req.body;

      if(!req.session.user){
        res.status(400).send('Not logged')
        return;
      }

      var username = req.session.user.username;

      var conn = app.infra.connectionFactory();
      var userDAO = new app.infra.UserDAO(conn);

      userDAO.addFav(username, data.owner, data.house, function(){
        data.res = 'OK'
        res.json(data)
      })

    });

    app.post('/house/fav/remove', function(req, res){
      var data = req.body;

      if(!req.session.user){
        res.status(400).send('Not logged')
        return;
      }

      var username = req.session.user.username;

      var conn = app.infra.connectionFactory();
      var userDAO = new app.infra.UserDAO(conn);

      userDAO.rmFav(username, data.owner, data.house, function(){
        data.res = 'OK'
        res.json(data)
      })

    });

    app.get('/house/fav/list', function(req, res){
      if(!req.session.user){

        res.redirect(url.format({
          pathname: '/login',
          query:{
            msg: 'Antes de ver seus favoritos, você precisa fazer o login',
            redir: '/house/fav/list'
          }
        }));

        return;
      }

      var username = req.session.user.username;


      var conn = app.infra.connectionFactory();
      var userDAO = new app.infra.UserDAO(conn);
      var houses = [];
      userDAO.lsFav(username, function(snap){
        var favs = snap.val();
        for(owner in favs){
          for(house in favs[owner]){
            houses.push({
              owner: owner,
              id: house
            })
          }
        }

        var conn = app.infra.connectionFactory();
        var houseDAO = new app.infra.HouseDAO(conn);
        var result = []
        for(i in houses){
          var x = houseDAO.searchByID(houses[i].owner, houses[i].id)
          result.push(x);
        }

        Promise.all(result).then(function(snap){
          var houses = {}
          for(s in snap){
            var temp = snap[s].val()
            var key = Object.keys(temp)[0]
            temp[key].id =key;
            houses[key] = temp[key];
          }

          res.render('house/list', {
            user: req.session.user,
            houses: houses,
            msg: 'Casas Favoritas',
            districts: app.consts.districts
          })
        })
      });
    })

    app.post('/house/fav/status', function(req,res){
      var conn = app.infra.connectionFactory();
      var userDAO = new app.infra.UserDAO(conn);
      var data = req.body;
      var answer = {};

      userDAO.favStatus(data.user, data.owner, data.house, function(snap){
        if(snap){
          answer.isFavorite = true;
        }else{
          answer.isFavorite = false;
        }

        res.json(answer);
      })
    })
}
