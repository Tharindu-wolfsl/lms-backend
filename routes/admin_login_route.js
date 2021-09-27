var express = require('express');
var router = express.Router();
var db=require('../database');
var app=express();
/* GET users listing. */
app.set('view engine', 'html');
router.get('/login', function(req, res, next) {
  res.render('admin_login_form');
});

router.post('/login', function(req, res){
    var emailAddress = req.body.email_address;
    var password = req.body.password;

    var sql='SELECT * FROM admin_reg WHERE email_address =? AND password =?';
    db.query(sql, [emailAddress, password], function (err, data, fields) {
        if(err) throw err
        if(data.length>0){
            req.session.loggedinUser= true;
            req.session.emailAddress= emailAddress;
            res.redirect('/dashboard');
        }else{
            res.render('admin_login_form',{alertMsg:"Your Email Address or password is wrong"});
        }
    })

})

module.exports = router;