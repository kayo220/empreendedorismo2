module.exports = function(app){
    app.get('/house/insert', function(req, res){
      res.render('house/form',{
        user: req.session.user,
        validationErrors: {},
        districts: app.consts.districts
      });
    })

    app.get('/house/list', function(req, res){
      var conn = app.infra.connectionFactory();
      var houseDAO = new app.infra.HouseDAO(conn);

      houseDAO.list(function(snap){
        var userHouses = snap.val()[req.session.user.username];
        res.render('house/list',{
          user: req.session.user,
          houses: userHouses
        })
      })
    });

    app.get('/house/view/:id', function(req, res){
      var id = req.params.id;
      var conn = app.infra.connectionFactory();
      var houseDAO = new app.infra.HouseDAO(conn, req.session.user.username);

      houseDAO.searchByID(id, function(snap){
        if(snap.val()){
          res.render('house/view',{
            user: req.session.user,
            house: snap.val()[id]
          })
        }
      })

    });

    app.post('/house/insert', app.uploader.array('photos', 4) ,function(req, res){
      var house = req.body;
      //console.log(req.files);
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

      // res.render('home/list',{
      //   house_id: id
      // })
      res.redirect('/house/list');
    })

}
