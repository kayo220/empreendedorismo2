module.exports = function(app){
    app.get('/login', function(req, res){
        res.render('login/login',{
            tab: 'login',
            validationErrors: {}
        });
    });

    app.post('/login', function(req, res){

    });
}