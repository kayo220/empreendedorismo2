module.exports = function(app){

    app.get('/', function(req, res){
        res.render('home/home', {
            user: req.session.user
        });
    });

}