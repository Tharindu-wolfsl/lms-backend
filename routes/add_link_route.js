var express = require('express');
var router = express.Router();
var db=require('../database');
var app=express();

// to display registration form 

app.set('view engine', 'handlebars');
router.get('/add_link', function(req, res, next) {
    if(req.session.loggedinUser){
        res.render('add_link',{email:req.session.emailAddress})
        
    }else{
        res.redirect('/login');
    }
});

// to store user input detail on post request
router.post('/add_link', function(req, res, next) {
    
    inputData ={
        class_date:req.body.class_date,
        class_time:req.body.class_time,
        class_name: req.body.class_name,
        grade:req.body.grade,
        medium:req.body.medium,
     Link: req.body.Link,
       
       
    }
// check unique email address
var sql='SELECT * FROM class_link WHERE class_name =?';
db.query(sql, [inputData.class_name] ,function (err, data, fields) {
 if(err) throw err
 
     
    // save users data into database
    var sql = 'INSERT INTO class_link SET ?';
   db.query(sql, inputData, function (err, data) {
      if (err) throw err;
           });
  var msg ="Your are successfully added Class link";
 
 res.render('add_link',{alertMsg:msg});
})

// app.get('/',(req,res)=>{

//   

// })
     
});
module.exports = router;