const express = require("express");
const cors = require('cors');
const fileUpload = require('express-fileupload');
const handlebars=require('express-handlebars');
var uuid = require('uuid')


const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser')

var session=require('express-session')
var bodyparser = require("body-parser");
var path=require('path');

app.use(bodyparser());
app.use(express.static("./public"))
// app.set('view engine', 'ejs')
app.engine('handlebars',handlebars({defaultLayout:'main'}));
app.set('view engine','handlebars');

// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
var registrationRouter = require('./routes/admin_reg_route');
var loginRouter = require('./routes/admin_login_route');
var dashboardRouter = require('./routes/admin_dashboard_route');
var logoutRouter = require('./routes/admin_logout_route');
var addClassRouter=require('./routes/add_class_route');

app.use('/', registrationRouter);
app.use('/', loginRouter);
app.use('/', dashboardRouter);
app.use('/', logoutRouter);
app.use('/',addClassRouter);

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "lms",


});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

// app.get("/api/get", (req, res) => {


//     const sqlGet = "SELECT * FROM crudtable";
//     db.query(sqlGet, (err, result) => {
//         res.send(result);
//     });

// });

app.post("/api/insert", (req, res) => {
    
    const fname = req.body.fname
    const lname = req.body.lname
    const school = req.body.school
    const phone = req.body.phone
    const email = req.body.email
    const grade = req.body.formHorizontalRadios
    const medium = req.body.formHorizontalRadios2




    //add to students table
    const sqlInsert = "INSERT INTO students (fname,lname,school,phone,email,grade,medium) VALUES (?,?,?,?,?,?,?)";
    db.query(sqlInsert, [fname, lname, school, phone, email, grade, medium], (err, result) => {
        console.log(err);
    });

    // add to student_Login table
    // const sqlInsert1 = "INSERT INTO student_login (std_name) VALUES (?)";
    // db.query(sqlInsert1, [fname + ' ' + lname], (err, result) => {
    //     console.log(err);
    // });

});


app.get('/',(req,res)=>{

    db.query("SELECT * FROM students",(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.render('student_view',{
            result:result
        })
    })

})
// app.delete("/api/delete", (req, res) => {

//     const name = req.body.name

//     const sqlDelete = 'DELETE FROM crudtable WHERE name=?';
//     db.query(sqlDelete, name, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//     });

// });
app.post('/deleteuser',function(req,res){

    var ino=req.body.std_id;
    db.query("Delete FROM students WHERE std_id="+ino+";",function(err,result){

        if(err) throw err;
        console.log(err);
        res.render('student_view',{
            result:result
        })
        
    })
})
app.get('/view_class',(req,res)=>{

    db.query("SELECT * FROM class_category",(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.render('view_class',{
            result:result
        })
    })

})

app.post('/deleteclass',function(req,res){

    var ino=req.body.class_id;
    db.query("Delete FROM class_category WHERE class_id="+ino+";",function(err,result){
        
        if(err) throw err;
        console.log(err);
        
        res.render('view_class',{
            result:result
        })
        
    })
})


app.post('/update',function(req,res){

    var inoo=req.body.std_id;
    var un=JSON.stringify(req.body.username);
    var pw=JSON.stringify(req.body.password);
  
    db.query("UPDATE students SET username="+un+", password= "+pw+" WHERE std_id="+inoo+";",function(err,result){
        if(err) throw err;
        console.log(err);
        res.render('student_view',{
            result:result
        })

    })
})

//shedule

app.get('/class_lib',(req,res)=>{
    res.render('home');
});

app.post('/create_lib',(req,res)=>{

    if(!req.files){
        res.send("No file upload")
    }
    // else{
    //     var file=req.files.image
    //     if(file.mimetype="image/jpeg"|| file.mimetype=="image/png" || file.mimetype=="image/gif"){
    //         var imageName=file.name
    //         console.log(imageName)
    //         var uuidname=uuid.v1();
    //         var imgsrc = 'http://127.0.0.1:3001/images/' + uuidname + file.name
    //         var insertData = "INSERT INTO class_library(class_note)VALUES(?)";
    //         db.query(insertData,[imgsrc],(err,result)=>{

    //             if (err) throw err
    //             file.mv('public/images/' + uuidname + file.name)
    //             res.send("Data successfully save")

    //         })
    // }}
     else {    
         
                var class_date=req.body.class_date;
                var week=req.body.week;
                var video_src=req.body.video_src;
                var file=req.files.doc;
               
                
	             var fileName = file.name;
	             console.log(fileName);
	             var uuidname = uuid.v1(); // this is used for unique file name
	             var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
	             var insertData = "INSERT INTO class_library(class_date,week,video_src,class_note) VALUES(?,?,?,?)";
	             db.query(insertData, [class_date,week,video_src,filesrc], (err, result) => {
	                 if (err) throw err
	                 file.mv('public/docs/' + uuidname + file.name)
	                 res.send("Data successfully save")
	             })
	         }
        
   
})


app.listen(3001, () => {

 

    console.log("App run on port 3001");
  
});