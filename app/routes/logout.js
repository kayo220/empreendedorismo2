module.exports = function(app){

    app.get('/logout', function(req, res){
        res.redirect('/home');
    });

    app.post('/logout', function(req, res){
        req.session.destroy(function(err) {
            res.redirect('/');
        });
    });
}