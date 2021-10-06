var express = require('express');
var router = express.Router();
var app=express();

app.set('view engine', 'handlebars');
/* GET users listing. */
router.get('/selectclass', function(req, res, next) {
    if(req.session.loggedinUser){
        res.render('selectclass',{email:req.session.emailAddress})
        
    }else{
        res.redirect('/login');
    }
});
module.exports = router;