var express = require('express');
var router = express.Router();
var db=require('../database');
var app=express();

// to display registration form 

app.set('view engine', 'handlebars');
router.get('/add_class', function(req, res, next) {
    if(req.session.loggedinUser){
        res.render('add_class',{email:req.session.emailAddress})
        
    }else{
        res.redirect('/login');
    }
});

// to store user input detail on post request
router.post('/add_class', function(req, res, next) {
    
    inputData ={
      
        class_name: req.body.class_name,
        grade:req.body.grade,
        medium:req.body.medium,
       cost: req.body.cost,
       
       
    }
// check unique email address


var sql='SELECT * FROM class_category WHERE class_name =?';
db.query(sql, [inputData.class_name] ,function (err, data, fields) {
 if(err) throw err
 
     
    // save users data into database
    var sql = 'INSERT INTO class_category SET ?';
   db.query(sql, inputData, function (err, data) {
      if (err) throw err;
           });
  var msg ="Your are successfully added class";
 
 res.render('add_class',{alertMsg:msg});
})

// app.get('/',(req,res)=>{

//   

// })
     
});
module.exports = router;