module.exports = function(app){

    app.get('/', function(req, res){
        var status;
        if(req.session.user){
            status = 'Usuário ' + req.session.user.name + ' logado';
        }else{
            status = 'Não existe usuário logado'
        }
        res.render('home/home', {
            msg: status
        });
    });

}