module.exports = function(app){

    app.post('/logout', function(req, res){
        req.session.destroy(function(err) {
            res.redirect('/');
        });
    });
}
