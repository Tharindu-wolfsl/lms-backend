const express = require("express");
const cors = require('cors');
const fileUpload = require('express-fileupload');
const handlebars=require('express-handlebars');
var uuid = require('uuid')
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');


const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser') 

var session=require('express-session')

var path=require('path');

app.use(bodyParser());
app.use(express.static("./public"))
// app.set('view engine', 'ejs')
app.engine('handlebars',handlebars({defaultLayout:'main'}));
app.set('view engine','handlebars');

// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
app.use(cors(
    {
   origin:['http://localhost:3000'],
   methods:['GET','POST'],
   credentials:true,
}
));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

app.use(session({ 
    key:'std_id',
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { expires: 30 * 24 * 60 * 60 * 1000 }
  }))
var registrationRouter = require('./routes/admin_reg_route');
var loginRouter = require('./routes/admin_login_route');
var dashboardRouter = require('./routes/admin_dashboard_route');
var logoutRouter = require('./routes/admin_logout_route');
var addClassRouter=require('./routes/add_class_route');
var addLinkRouter=require('./routes/add_link_route');
var selectClassRouter=require('./routes/selectclass_route')
const { verify } = require("crypto");
const { send } = require("process");
const { Console } = require("console");

app.use('/', registrationRouter);
app.use('/', loginRouter);
app.use('/', dashboardRouter);
app.use('/', logoutRouter);
app.use('/',addClassRouter);
app.use('/',addLinkRouter);
app.use('/',selectClassRouter);

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "lms",


});



// app.get("/api/get", (req, res) => {


//     const sqlGet = "SELECT * FROM crudtable";
//     db.query(sqlGet, (err, result) => {
//         res.send(result);
//     });

// });

app.post("/insert", (req, res) => {
    
    const fname = req.body.fname
    const lname = req.body.lname
    const school = req.body.school
    const phone = req.body.phone
    const email = req.body.email
    const grade = req.body.formHorizontalRadios
    const medium = req.body.formHorizontalRadios2
    // const file=req.files.image
    //     if(file.mimetype="image/jpeg"|| file.mimetype=="image/png" || file.mimetype=="image/gif"){
    //         var imageName=file.name
    //         console.log(imageName)
    //         var uuidname=uuid.v1();
    //         var imgsrc = 'http://127.0.0.1:3001/images/' + uuidname + file.name
    //         var insertData = "INSERT INTO students(image)VALUES(?)";
    //         db.query(insertData,[imgsrc],(err,result)=>{

    //             if (err) throw err
    //             file.mv('public/images/' + uuidname + file.name)
    //             res.send("Data successfully save")

    //         })
    // }

    



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


app.get('/student_table',(req,res)=>{

    db.query("SELECT * FROM students",(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(req.session.loggedinUser){
           
            res.render('student_view',{
                email:req.session.emailAddress,
                result:result
            })
            
        }else{
            res.redirect('/login');
        }
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

        if(err){
            console.log(err);
           
        }
      else{
        res.render('student_view',{
            result:result
        
        })}
        
    })
})
app.get('/view_class',(req,res)=>{

    db.query("SELECT * FROM class_category",(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(req.session.loggedinUser){
            res.render('view_class',{email:req.session.emailAddress
            ,result:result})
            
        }else{
            res.redirect('/login');
        }
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

app.get('/view_link',(req,res)=>{

    db.query("SELECT * FROM class_link",(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(req.session.loggedinUser){
            res.render('view_link',{email:req.session.emailAddress
            ,result:result})
            
        }else{
            res.redirect('/login');
        }
    })

})

app.post('/deletelink',function(req,res){

    var ino=req.body.Id;
    db.query("Delete FROM class_link WHERE Id="+ino+";",function(err,result){
        
        if(err) throw err;
        console.log(err);
        
        res.render('view_link',{
            result:result
        })
        
    })
})
app.get('/view_lib',(req,res)=>{

    db.query("SELECT * FROM class_library",(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(req.session.loggedinUser){
            res.render('view_libraries',{email:req.session.emailAddress
            ,result:result})
            
        }else{
            res.redirect('/login');
        }
    })

})
app.post('/deletelib',function(req,res){

    var ino=req.body.id;
    db.query("Delete FROM class_library WHERE Id="+ino+";",function(err,result){
        
        if(err) throw err;
        console.log(err);
        
        res.render('view_libraries',{
            result:result
        })
        
    })
})
app.get('/view_course',(req,res)=>{

    db.query("SELECT * FROM course_category",(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(req.session.loggedinUser){
            res.render('view_courses',{email:req.session.emailAddress
            ,result:result})
            
        }else{
            res.redirect('/login');
        }
    })

})
app.post('/deletecourse',function(req,res){

    var ino=req.body.id;
    db.query("Delete FROM course_category WHERE course_id="+ino+";",function(err,result){
        
        if(err) throw err;
        console.log(err);
        
        res.render('view_courses',{
            result:result
        })
        
    })
})


app.post('/update',function(req,res){

    var ino=req.body.std_id;
    console.log("un"+req.body.std_id)

    var un=JSON.stringify(req.body.username);
    var pw=JSON.stringify(req.body.password);

  
  
    db.query("UPDATE students SET username="+un+", password= "+pw+" WHERE std_id="+ino+";",function(err,result){
        if(err) throw err;
        console.log(err);
        res.render('student_view',{
            result:result

            


        })

    })
})
app.post('/save',function(req,res){

    var ino=req.body.std_id;
    console.log("un"+req.body.std_id)

    var class_val=req.body.class_val;
   

  
  
    db.query("UPDATE students SET class="+class_val+" WHERE std_id="+ino+";",function(err,result){
        if(err) throw err;
        console.log(err);
        res.render('student_view',{
            result:result

            


        })

    })
})

//shedule
app.get('/courses',(req,res)=>{
    if(req.session.loggedinUser){
        res.render('add_courses',{email:req.session.emailAddress})
        
    }else{
        res.redirect('/login');
    }
});

app.get('/class_lib',(req,res)=>{
    if(req.session.loggedinUser){
        res.render('home',{email:req.session.emailAddress})
        
    }else{
        res.redirect('/login');
    }
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
                var class_name=req.body.class_name;
                var class_date=req.body.class_date;
                var grade=req.body.grade;
                var medium=req.body.medium;
                var week=req.body.week;
                var video_src=req.body.video_src;
                var file=req.files.doc;
               
                
	             var fileName = file.name;
	             console.log(fileName);
	             var uuidname = uuid.v1(); // this is used for unique file name
	             var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
	             var insertData = "INSERT INTO class_library(class_name,class_date,grade,medium,week,video_src,class_note) VALUES(?,?,?,?,?,?,?)";
	             db.query(insertData, [class_name,class_date,grade,medium,week,video_src,filesrc], (err, result) => {
	                 if (err) throw err
	                 file.mv('public/docs/' + uuidname + file.name)
	                 res.send("Data successfully save")
	             })
	         }
        
   
})
app.post('/create_course',(req,res)=>{


                var course_name=req.body.course_name;
                var grade=req.body.grade;
                var medium=req.body.medium;
                
                
	             var insertData = "INSERT INTO course_category(course_name,grade,medium) VALUES(?,?,?)";
	             db.query(insertData, [course_name,grade,medium], (err, result) => {
	                 if (err) throw err
	                 
	                 res.send("Data successfully save")
	             })
	        
        
   
})

const verifyJWT=(req,res,next)=>{

    const token=req.headers["x-access-token"]; //request token

   if(!token){

    res.send("Please send token");
    
   }
   else{

    jwt.verify(token,"jwtSecret",(err,decoded)=>{

        if(err){

            res.json({auth:false,message:"authentication failed"});
        }
        else{

            req.userId=decoded.id;
            next();
        }
    })

   } 
}


//user login

app.post('/login_req',(req,res)=>{

    const username=req.body.email;
    const password=req.body.password;

db.query("SELECT * FROM students WHERE username=? AND password=?",[username,password],(err,result)=>{

    if(err){
        res.send({err:err});
    }
    if(result.length>0){
        //creating token
        const id=result[0].id;
        const token=jwt.sign({id},
            "jwtSecret",
            {expiresIn: 300,}
            );

        req.session.user=result;
        req.session.username=username;
       console.log(result)
      
       
      
        
       // res.json({userdata:req.session.user});
        res.json({auth:true,token:token,result:result});
    }
    else{

        res.json({auth:false,message:"No rigth user name password combination"});
    }
    

})

})

//api request
app.get('/isUserAuth',verifyJWT,(req,res)=>{

   res.send(req.session.user)
    
}
)

app.get('/login_req',(req,res)=>{

    if(req.session.user){

        res.send({loggedIn:true,user: req.session.user})
    }
    else{
        res.send({loggedIn:false})
        
    }
})


app.post('/user_update',(req,res)=>{

    const phone=req.body.phone
    const email=req.body.email
    const grade=req.body.grade
    const medium=req.body.medium
    const username=req.body.username
    const password=req.body.password
    const newpassword=req.body.newpassword


    db.query("UPDATE students SET phone=?, email=?, grade=?, medium=?, password=? WHERE username=? AND password=? ",[phone,email,grade,medium,newpassword,username,password],(err,result)=>{

        if(err){
            console.log(err)
        }
        else{

            console.log("Update success");
        }



    })



})

app.get('/class_req',(req,res)=>{

    db.query("SELECT * FROM class_category",(err,result)=>{
        if(err) {
        console.log(result);
        }
        else{

            res.send(result);
        }
    })


})
app.get('/course_req',(req,res)=>{

    db.query("SELECT * FROM course_category",(err,result)=>{
        if(err) {
        console.log(result);
        }
        else{

            res.send(result);
        }
    })


})

app.get('/getLibClass',(req,res)=>{


    db.query("SELECT * FROM class_library",(err,result)=>{

        if(err){
            console.log(err)
        }else{


            res.send(result)
        }

    })
})

app.post('/create_g10m',(req,res)=>{
 
    var class_date=req.body.date;
            
    var medium=req.body.medium;
   
    var video_src1=req.body.video1;
    var video_src2=req.body.video2;
    var video_src3=req.body.video3;
    var video_src4=req.body.video4;
    var video_src5=req.body.video5;
    var week1=req.body.week1;
    var week2=req.body.week2;
    var week3=req.body.week3;
    var week4=req.body.week4;
    var week5=req.body.week5;
   
    
    //  var fileName = file.name;
    //  console.log(fileName);
    //  var uuidname = uuid.v1(); // this is used for unique file name
    //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
    var insertData = "INSERT INTO grade10math(date,medium,video1,week1,video2,week2,video3,week3,video4,week4,video5,week5) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(insertData, [class_date,medium,video_src1,week1,video_src2,week2,video_src3,week3,video_src4,week4,video_src5,week5], (err, result) => {
        if (err) throw err
       
        res.send("Data successfully save")
    })
   
})
app.get('/class_g10m',(req,res)=>{
    if(req.session.loggedinUser){
        res.render('add_grade10math',{email:req.session.emailAddress})
        
    }else{
        res.redirect('/login');
    }
});
app.get('/view_g10m',(req,res)=>{

    db.query("SELECT * FROM grade10math",(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(req.session.loggedinUser){
            res.render('view_g10m',{email:req.session.emailAddress
            ,result:result})
            
        }else{
            res.redirect('/login');
        }
    })

})
app.post('/create_g10h',(req,res)=>{
 
    var class_date=req.body.date;
            
    var medium=req.body.medium;
   
    var video_src1=req.body.video1;
    var video_src2=req.body.video2;
    var video_src3=req.body.video3;
    var video_src4=req.body.video4;
    var video_src5=req.body.video5;
    var week1=req.body.week1;
    var week2=req.body.week2;
    var week3=req.body.week3;
    var week4=req.body.week4;
    var week5=req.body.week5;
   
    
    //  var fileName = file.name;
    //  console.log(fileName);
    //  var uuidname = uuid.v1(); // this is used for unique file name
    //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
    var insertData = "INSERT INTO grade10history(date,medium,video1,week1,video2,week2,video3,week3,video4,week4,video5,week5) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(insertData, [class_date,medium,video_src1,week1,video_src2,week2,video_src3,week3,video_src4,week4,video_src5,week5], (err, result) => {
        if (err) throw err
       
        res.send("Data successfully save")
    })
   
})
app.get('/class_g10h',(req,res)=>{
    if(req.session.loggedinUser){
        res.render('add_grade10history',{email:req.session.emailAddress})
        
    }else{
        res.redirect('/login');
    }
});
app.get('/view_g10h',(req,res)=>{

    db.query("SELECT * FROM grade10history",(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(req.session.loggedinUser){
            res.render('view_g10h',{email:req.session.emailAddress
            ,result:result})
            
        }else{
            res.redirect('/login');
        }
    })

})
app.post('/deleteg10m',function(req,res){

    var ino=req.body.id;
    db.query("Delete FROM grade10math WHERE id="+ino+";",function(err,result){
        
        if(err) throw err;
        console.log(err);
        
        res.render('view_g10m',{
            result:result
        })
        
    })
})

//g11h
app.post('/create_g11h',(req,res)=>{

  
    var class_date=req.body.date;
    
            
    var medium=req.body.medium;
   
    
    var video_src1=req.body.video1;
    var video_src2=req.body.video2;
    var video_src3=req.body.video3;
    var video_src4=req.body.video4;
    var video_src5=req.body.video5;
    var week1=req.body.week1;
    var week2=req.body.week2;
    var week3=req.body.week3;
    var week4=req.body.week4;
    var week5=req.body.week5;
   
    
    //  var fileName = file.name;
    //  console.log(fileName);
    //  var uuidname = uuid.v1(); // this is used for unique file name
    //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
    var insertData = "INSERT INTO grade11history(date,medium,video1,week1,video2,week2,video3,week3,video4,week4,video5,week5) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(insertData, [class_date,medium,video_src1,week1,video_src2,week2,video_src3,week3,video_src4,week4,video_src5,week5], (err, result) => {
        if (err) throw err
       
        res.send("Data successfully save")
    })
   
})
app.get('/class_g11h',(req,res)=>{
    if(req.session.loggedinUser){
        res.render('add_grade11history',{email:req.session.emailAddress})
        
    }else{
        res.redirect('/login');
    }
});
app.get('/view_g11h',(req,res)=>{

    db.query("SELECT * FROM grade11history",(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(req.session.loggedinUser){
            res.render('view_g11h',{email:req.session.emailAddress
            ,result:result})
            
        }else{
            res.redirect('/login');
        }
    })

})
app.post('/deleteg11h',function(req,res){

    var ino=req.body.id;
    db.query("Delete FROM grade11history WHERE id="+ino+";",function(err,result){
        
        if(err) throw err;
        console.log(err);
        
        res.render('view_g11h',{
            result:result
        })
        
    })
})

//g10sin
app.post('/create_g10sin',(req,res)=>{

  
    var class_date=req.body.date;
    
            
    var medium=req.body.medium;
   
    
    var video_src1=req.body.video1;
    var video_src2=req.body.video2;
    var video_src3=req.body.video3;
    var video_src4=req.body.video4;
    var video_src5=req.body.video5;
    var week1=req.body.week1;
    var week2=req.body.week2;
    var week3=req.body.week3;
    var week4=req.body.week4;
    var week5=req.body.week5;
   
    
    //  var fileName = file.name;
    //  console.log(fileName);
    //  var uuidname = uuid.v1(); // this is used for unique file name
    //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
    var insertData = "INSERT INTO grade10sinhala(date,medium,video1,week1,video2,week2,video3,week3,video4,week4,video5,week5) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(insertData, [class_date,medium,video_src1,week1,video_src2,week2,video_src3,week3,video_src4,week4,video_src5,week5], (err, result) => {
        if (err) throw err
       
        res.send("Data successfully save")
    })
   
})
app.get('/class_g10sin',(req,res)=>{
    if(req.session.loggedinUser){
        res.render('add_grade10sinhala',{email:req.session.emailAddress})
        
    }else{
        res.redirect('/login');
    }
});
app.get('/view_g10sin',(req,res)=>{

    db.query("SELECT * FROM grade10sinhala",(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(req.session.loggedinUser){
            res.render('view_g10sin',{email:req.session.emailAddress
            ,result:result})
            
        }else{
            res.redirect('/login');
        }
    })

})
app.post('/deleteg10sin',function(req,res){

    var ino=req.body.id;
    db.query("Delete FROM grade10sinhala WHERE id="+ino+";",function(err,result){
        
        if(err) throw err;
        console.log(err);
        
        res.render('view_g10sin',{
            result:result
        })
        
    })
})

//g11sin
app.post('/create_g11sin',(req,res)=>{

  
    var class_date=req.body.date;
    
            
    var medium=req.body.medium;
   
    
    var video_src1=req.body.video1;
    var video_src2=req.body.video2;
    var video_src3=req.body.video3;
    var video_src4=req.body.video4;
    var video_src5=req.body.video5;
    var week1=req.body.week1;
    var week2=req.body.week2;
    var week3=req.body.week3;
    var week4=req.body.week4;
    var week5=req.body.week5;
   
    
    //  var fileName = file.name;
    //  console.log(fileName);
    //  var uuidname = uuid.v1(); // this is used for unique file name
    //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
    var insertData = "INSERT INTO grade11sinhala(date,medium,video1,week1,video2,week2,video3,week3,video4,week4,video5,week5) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(insertData, [class_date,medium,video_src1,week1,video_src2,week2,video_src3,week3,video_src4,week4,video_src5,week5], (err, result) => {
        if (err) throw err
       
        res.send("Data successfully save")
    })
   
})
app.get('/class_g11sin',(req,res)=>{
    if(req.session.loggedinUser){
        res.render('add_grade11sinhala',{email:req.session.emailAddress})
        
    }else{
        res.redirect('/login');
    }
});
app.get('/view_g11sin',(req,res)=>{

    db.query("SELECT * FROM grade11sinhala",(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(req.session.loggedinUser){
            res.render('view_g11sin',{email:req.session.emailAddress
            ,result:result})
            
        }else{
            res.redirect('/login');
        }
    })

})
app.post('/deleteg11sin',function(req,res){

    var ino=req.body.id;
    db.query("Delete FROM grade11sinhala WHERE id="+ino+";",function(err,result){
        
        if(err) throw err;
        console.log(err);
        
        res.render('view_g11sin',{
            result:result
        })
        
    })
})
//g10e
app.post('/create_g10e',(req,res)=>{

  
    var class_date=req.body.date;
    
            
    var medium=req.body.medium;
   
    
    var video_src1=req.body.video1;
    var video_src2=req.body.video2;
    var video_src3=req.body.video3;
    var video_src4=req.body.video4;
    var video_src5=req.body.video5;
    var week1=req.body.week1;
    var week2=req.body.week2;
    var week3=req.body.week3;
    var week4=req.body.week4;
    var week5=req.body.week5;
   
    
    //  var fileName = file.name;
    //  console.log(fileName);
    //  var uuidname = uuid.v1(); // this is used for unique file name
    //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
    var insertData = "INSERT INTO grade10english(date,medium,video1,week1,video2,week2,video3,week3,video4,week4,video5,week5) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(insertData, [class_date,medium,video_src1,week1,video_src2,week2,video_src3,week3,video_src4,week4,video_src5,week5], (err, result) => {
        if (err) throw err
       
        res.send("Data successfully save")
    })
   
})
app.get('/class_g10e',(req,res)=>{
    if(req.session.loggedinUser){
        res.render('add_grade10english',{email:req.session.emailAddress})
        
    }else{
        res.redirect('/login');
    }
});
app.get('/view_g10e',(req,res)=>{

    db.query("SELECT * FROM grade10english",(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(req.session.loggedinUser){
            res.render('view_g10e',{email:req.session.emailAddress
            ,result:result})
            
        }else{
            res.redirect('/login');
        }
    })

})
app.post('/deleteg10e',function(req,res){

    var ino=req.body.id;
    db.query("Delete FROM grade10english WHERE id="+ino+";",function(err,result){
        
        if(err) throw err;
        console.log(err);
        
        res.render('view_g10e',{
            result:result
        })
        
    })
})
//g11e
app.post('/create_g11e',(req,res)=>{

  
    var class_date=req.body.date;
    
            
    var medium=req.body.medium;
   
    
    var video_src1=req.body.video1;
    var video_src2=req.body.video2;
    var video_src3=req.body.video3;
    var video_src4=req.body.video4;
    var video_src5=req.body.video5;
    var week1=req.body.week1;
    var week2=req.body.week2;
    var week3=req.body.week3;
    var week4=req.body.week4;
    var week5=req.body.week5;
   
    
    //  var fileName = file.name;
    //  console.log(fileName);
    //  var uuidname = uuid.v1(); // this is used for unique file name
    //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
    var insertData = "INSERT INTO grade11english(date,medium,video1,week1,video2,week2,video3,week3,video4,week4,video5,week5) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(insertData, [class_date,medium,video_src1,week1,video_src2,week2,video_src3,week3,video_src4,week4,video_src5,week5], (err, result) => {
        if (err) throw err
       
        res.send("Data successfully save")
    })
   
})
app.get('/class_g11e',(req,res)=>{
    if(req.session.loggedinUser){
        res.render('add_grade11english',{email:req.session.emailAddress})
        
    }else{
        res.redirect('/login');
    }
});
app.get('/view_g11e',(req,res)=>{

    db.query("SELECT * FROM grade11english",(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(req.session.loggedinUser){
            res.render('view_g11e',{email:req.session.emailAddress
            ,result:result})
            
        }else{
            res.redirect('/login');
        }
    })

})
app.post('/deleteg11e',function(req,res){

    var ino=req.body.id;
    db.query("Delete FROM grade11english WHERE id="+ino+";",function(err,result){
        
        if(err) throw err;
        console.log(err);
        
        res.render('view_g11e',{
            result:result
        })
        
    })
})


//g10s

app.post('/create_g10s',(req,res)=>{

  
    var class_date=req.body.date;
    
            
    var medium=req.body.medium;
   
    
    var video_src1=req.body.video1;
    var video_src2=req.body.video2;
    var video_src3=req.body.video3;
    var video_src4=req.body.video4;
    var video_src5=req.body.video5;
    var week1=req.body.week1;
    var week2=req.body.week2;
    var week3=req.body.week3;
    var week4=req.body.week4;
    var week5=req.body.week5;
   
    
    //  var fileName = file.name;
    //  console.log(fileName);
    //  var uuidname = uuid.v1(); // this is used for unique file name
    //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
    var insertData = "INSERT INTO grade10sci(date,medium,video1,week1,video2,week2,video3,week3,video4,week4,video5,week5) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(insertData, [class_date,medium,video_src1,week1,video_src2,week2,video_src3,week3,video_src4,week4,video_src5,week5], (err, result) => {
        if (err) throw err
       
        res.send("Data successfully save")
    })
   
})
app.get('/class_g10s',(req,res)=>{
    if(req.session.loggedinUser){
        res.render('add_grade10sci',{email:req.session.emailAddress})
        
    }else{
        res.redirect('/login');
    }
});
app.get('/view_g10s',(req,res)=>{

    db.query("SELECT * FROM grade10sci",(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(req.session.loggedinUser){
            res.render('view_g10s',{email:req.session.emailAddress
            ,result:result})
            
        }else{
            res.redirect('/login');
        }
    })

})
app.post('/deleteg10s',function(req,res){

    var ino=req.body.id;
    db.query("Delete FROM grade10sci WHERE id="+ino+";",function(err,result){
        
        if(err) throw err;
        console.log(err);
        
        res.render('view_g10s',{
            result:result
        })
        
    })
})


//g11m

app.post('/create_g11m',(req,res)=>{

  
    var class_date=req.body.date;
            
    var medium=req.body.medium;
   
  
    
    var video_src1=req.body.video1;
    var video_src2=req.body.video2;
    var video_src3=req.body.video3;
    var video_src4=req.body.video4;
    var video_src5=req.body.video5;
    var week1=req.body.week1;
    var week2=req.body.week2;
    var week3=req.body.week3;
    var week4=req.body.week4;
    var week5=req.body.week5;
   
    
    //  var fileName = file.name;
    //  console.log(fileName);
    //  var uuidname = uuid.v1(); // this is used for unique file name
    //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
    var insertData = "INSERT INTO grade11math(date,medium,video1,week1,video2,week2,video3,week3,video4,week4,video5,week5) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(insertData, [class_date,medium,video_src1,week1,video_src2,week2,video_src3,week3,video_src4,week4,video_src5,week5], (err, result) => {
        if (err) throw err
       
        res.send("Data successfully save")
    })

        
   
})
app.get('/class_g11m',(req,res)=>{
    if(req.session.loggedinUser){
        res.render('add_grade11math',{email:req.session.emailAddress})
        
    }else{
        res.redirect('/login');
    }
});
app.get('/view_g11m',(req,res)=>{

    db.query("SELECT * FROM grade11math",(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(req.session.loggedinUser){
            res.render('view_g11m',{email:req.session.emailAddress
            ,result:result})
            
        }else{
            res.redirect('/login');
        }
    })

})
app.post('/deleteg11m',function(req,res){

    var ino=req.body.id;
    db.query("Delete FROM grade11math WHERE id="+ino+";",function(err,result){
        
        if(err) throw err;
        console.log(err);
        
        res.render('view_g11m',{
            result:result
        })
        
    })
})


//g11s

app.post('/create_g11s',(req,res)=>{

       
               
                var class_date=req.body.date;
            
                var medium=req.body.medium;
               
               
    var video_src1=req.body.video1;
    var video_src2=req.body.video2;
    var video_src3=req.body.video3;
    var video_src4=req.body.video4;
    var video_src5=req.body.video5;
    var week1=req.body.week1;
    var week2=req.body.week2;
    var week3=req.body.week3;
    var week4=req.body.week4;
    var week5=req.body.week5;
   
    
    //  var fileName = file.name;
    //  console.log(fileName);
    //  var uuidname = uuid.v1(); // this is used for unique file name
    //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
    var insertData = "INSERT INTO grade11sci(date,medium,video1,week1,video2,week2,video3,week3,video4,week4,video5,week5) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(insertData, [class_date,medium,video_src1,week1,video_src2,week2,video_src3,week3,video_src4,week4,video_src5,week5], (err, result) => {
        if (err) throw err
       
        res.send("Data successfully save")
    })
	        
   
})
app.get('/class_g11s',(req,res)=>{
    if(req.session.loggedinUser){
        res.render('add_grade11sci',{email:req.session.emailAddress})
        
    }else{
        res.redirect('/login');
    }
});
app.get('/view_g11s',(req,res)=>{

    db.query("SELECT * FROM grade11sci",(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(req.session.loggedinUser){
            res.render('view_g11s',{email:req.session.emailAddress
            ,result:result})
        
            
        }else{
            res.redirect('/login');
        }
    })

})
app.post('/deleteg11s',function(req,res){

    var ino=req.body.id;
    db.query("Delete FROM grade11sci WHERE id="+ino+";",function(err,result){
        
        if(err) throw err;
        console.log(err);
        
        res.render('view_g11s',{
            result:result
        })
        
    })
})
app.post('/deleteg10h',function(req,res){

    var ino=req.body.id;
    db.query("Delete FROM grade10history WHERE id="+ino+";",function(err,result){
        
        if(err) throw err;
        console.log(err);
        
        res.render('view_g10h',{
            result:result
        })
        
    })
})


//aop
app.post('/create_aop',(req,res)=>{

   
    var class_date=req.body.date;
            
    var medium=req.body.medium;
   
   
     
    var video_src1=req.body.video1;
    var video_src2=req.body.video2;
    var video_src3=req.body.video3;
    var video_src4=req.body.video4;
    var video_src5=req.body.video5;
    var week1=req.body.week1;
    var week2=req.body.week2;
    var week3=req.body.week3;
    var week4=req.body.week4;
    var week5=req.body.week5;
   
    
    //  var fileName = file.name;
    //  console.log(fileName);
    //  var uuidname = uuid.v1(); // this is used for unique file name
    //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
    var insertData = "INSERT INTO afterolphy(date,medium,video1,week1,video2,week2,video3,week3,video4,week4,video5,week5) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(insertData, [class_date,medium,video_src1,week1,video_src2,week2,video_src3,week3,video_src4,week4,video_src5,week5], (err, result) => {
        if (err) throw err
       
        res.send("Data successfully save")
    })
        
   
})
app.get('/class_aop',(req,res)=>{
    if(req.session.loggedinUser){
        res.render('add_aolphy',{email:req.session.emailAddress})
        
    }else{
        res.redirect('/login');
    }
});
app.get('/view_aop',(req,res)=>{

    db.query("SELECT * FROM afterolphy",(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(req.session.loggedinUser){
            res.render('view_aop',{email:req.session.emailAddress
            ,result:result})
            
        }else{
            res.redirect('/login');
        }
    })

})
app.post('/deleteaop',function(req,res){

    var ino=req.body.id;
    db.query("Delete FROM afterolphy WHERE id="+ino+";",function(err,result){
        
        if(err) throw err;
        console.log(err);
        
        res.render('view_aop',{
            result:result
        })
        
    })
})


//aoc


app.post('/create_aoc',(req,res)=>{

 
    var class_date=req.body.date;
            
    var medium=req.body.medium;
   
    var video_src1=req.body.video1;
    var video_src2=req.body.video2;
    var video_src3=req.body.video3;
    var video_src4=req.body.video4;
    var video_src5=req.body.video5;
    var week1=req.body.week1;
    var week2=req.body.week2;
    var week3=req.body.week3;
    var week4=req.body.week4;
    var week5=req.body.week5;
   
    
    //  var fileName = file.name;
    //  console.log(fileName);
    //  var uuidname = uuid.v1(); // this is used for unique file name
    //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
    var insertData = "INSERT INTO afterolmath(date,medium,video1,week1,video2,week2,video3,week3,video4,week4,video5,week5) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(insertData, [class_date,medium,video_src1,week1,video_src2,week2,video_src3,week3,video_src4,week4,video_src5,week5], (err, result) => {
        if (err) throw err
       
        res.send("Data successfully save")
    })
   
})
app.get('/class_aoc',(req,res)=>{
    if(req.session.loggedinUser){
        res.render('add_aolcmath',{email:req.session.emailAddress})
        
    }else{
        res.redirect('/login');
    }
});
app.get('/view_aoc',(req,res)=>{

    db.query("SELECT * FROM afterolcmath",(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(req.session.loggedinUser){
            res.render('view_aoc',{email:req.session.emailAddress
            ,result:result})
            
        }else{
            res.redirect('/login');
        }
    })

})
app.post('/deleteaoc',function(req,res){

    var ino=req.body.id;
    db.query("Delete FROM afterolcmath WHERE id="+ino+";",function(err,result){
        
        if(err) throw err;
        console.log(err);
        
        res.render('view_aoc',{
            result:result
        })
        
    })
})

app.get('/getLibS11',(req,res)=>{


    db.query("SELECT * FROM grade11sci ORDER BY date",(err,result)=>{

        if(err){
            console.log(err)
        }else{


            res.send(result)
        }

    })
})
app.get('/deactLibS11',(req,res)=>{

     
    var curdate =new Intl.DateTimeFormat('en-GB').format(new Date())
    var curmonth=curdate.substr(3,2)

db.query("SELECT * FROM grade11sci WHERE MONTH(date) < MONTH(CURDATE()) order BY date",(err,result)=>{

if(err){
   console.log(err)
}else{

   res.send(result)
   console.log(curmonth)
  // console.log(result)

}


})


})

app.get('/getLibM11',(req,res)=>{


    db.query("SELECT * FROM grade11math ORDER BY date",(err,result)=>{

        if(err){
            console.log(err)
        }else{


            res.send(result)
        }

    })
})
app.get('/deactLibM11',(req,res)=>{

     
    var curdate =new Intl.DateTimeFormat('en-GB').format(new Date())
    var curmonth=curdate.substr(3,2)

db.query("SELECT * FROM grade11math WHERE MONTH(date) < MONTH(CURDATE()) order BY date",(err,result)=>{

if(err){
   console.log(err)
}else{

   res.send(result)
   console.log(curmonth)
  // console.log(result)

}


})


})


app.get('/getLibS10',(req,res)=>{


    db.query("SELECT * FROM grade10sci ORDER BY date",(err,result)=>{

        if(err){
            console.log(err)
        }else{


            res.send(result)
        }

    })
})
app.get('/deactLibS10',(req,res)=>{

     
     var curdate =new Intl.DateTimeFormat('en-GB').format(new Date())
     var curmonth=curdate.substr(3,2)

db.query("SELECT * FROM grade10sci WHERE MONTH(date) < MONTH(CURDATE()) order BY date",(err,result)=>{

if(err){
    console.log(err)
}else{

    res.send(result)
    console.log(curmonth)
   // console.log(result)

}


})


})

app.get('/getLibM10',(req,res)=>{


    db.query("SELECT * FROM grade10math ORDER BY date",(err,result)=>{

        if(err){
            console.log(err)
        }else{


            res.send(result)
        }

    })
})
app.get('/deactLibM10',(req,res)=>{

     
    var curdate =new Intl.DateTimeFormat('en-GB').format(new Date())
    var curmonth=curdate.substr(3,2)

db.query("SELECT * FROM grade10math WHERE MONTH(date) < MONTH(CURDATE()) order BY date",(err,result)=>{

if(err){
   console.log(err)
}else{

   res.send(result)
   console.log(curmonth)
  // console.log(result)

}


})


})
//other

app.get('/getLibH10',(req,res)=>{


    db.query("SELECT * FROM grade10history ORDER BY date",(err,result)=>{

        if(err){
            console.log(err)
        }else{


            res.send(result)
        }

    })
})
app.get('/deactLibH10',(req,res)=>{

     
    var curdate =new Intl.DateTimeFormat('en-GB').format(new Date())
    var curmonth=curdate.substr(3,2)

db.query("SELECT * FROM grade10history WHERE MONTH(date) < MONTH(CURDATE()) order BY date",(err,result)=>{

if(err){
   console.log(err)
}else{

   res.send(result)
   console.log(curmonth)
  // console.log(result)

}

})

})


app.get('/getLibH11',(req,res)=>{


    db.query("SELECT * FROM grade11history ORDER BY date",(err,result)=>{

        if(err){
            console.log(err)
        }else{


            res.send(result)
        }

    })
})
app.get('/deactLibH11',(req,res)=>{

     
    var curdate =new Intl.DateTimeFormat('en-GB').format(new Date())
    var curmonth=curdate.substr(3,2)

db.query("SELECT * FROM grade11history WHERE MONTH(date) < MONTH(CURDATE()) order BY date",(err,result)=>{

if(err){
   console.log(err)
}else{

   res.send(result)
   console.log(curmonth)
  // console.log(result)

}


})


})



app.get('/getLibSI10',(req,res)=>{


    db.query("SELECT * FROM grade10sinhala ORDER BY date",(err,result)=>{

        if(err){
            console.log(err)
        }else{


            res.send(result)
        }

    })
})
app.get('/deactLibSI10',(req,res)=>{

     
    var curdate =new Intl.DateTimeFormat('en-GB').format(new Date())
    var curmonth=curdate.substr(3,2)

db.query("SELECT * FROM grade10sinhala WHERE MONTH(date) < MONTH(CURDATE()) order BY date",(err,result)=>{

if(err){
   console.log(err)
}else{

   res.send(result)
   console.log(curmonth)
  // console.log(result)

}


})


})


app.get('/getLibSI11',(req,res)=>{


    db.query("SELECT * FROM grade11sinhala ORDER BY date",(err,result)=>{

        if(err){
            console.log(err)
        }else{


            res.send(result)
        }

    })
})
app.get('/deactLibSI11',(req,res)=>{

     
    var curdate =new Intl.DateTimeFormat('en-GB').format(new Date())
    var curmonth=curdate.substr(3,2)

db.query("SELECT * FROM grade11sinhala WHERE MONTH(date) < MONTH(CURDATE()) order BY date",(err,result)=>{

if(err){
   console.log(err)
}else{

   res.send(result)
   console.log(curmonth)
  // console.log(result)

}


})


})


app.get('/getLibE10',(req,res)=>{


    db.query("SELECT * FROM grade10english ORDER BY date",(err,result)=>{

        if(err){
            console.log(err)
        }else{


            res.send(result)
        }

    })
})
app.get('/deactLibE10',(req,res)=>{

     
    var curdate =new Intl.DateTimeFormat('en-GB').format(new Date())
    var curmonth=curdate.substr(3,2)

db.query("SELECT * FROM grade10english WHERE MONTH(date) < MONTH(CURDATE()) order BY date",(err,result)=>{

if(err){
   console.log(err)
}else{

   res.send(result)
   console.log(curmonth)
  // console.log(result)

}


})


})


app.get('/getLibE11',(req,res)=>{


    db.query("SELECT * FROM grade11english ORDER BY date",(err,result)=>{

        if(err){
            console.log(err)
        }else{


            res.send(result)
        }

    })
})
app.get('/deactLibE11',(req,res)=>{

     
    var curdate =new Intl.DateTimeFormat('en-GB').format(new Date())
    var curmonth=curdate.substr(3,2)

db.query("SELECT * FROM grade11english WHERE MONTH(date) < MONTH(CURDATE()) order BY date",(err,result)=>{

if(err){
   console.log(err)
}else{

   res.send(result)
   console.log(curmonth)
  // console.log(result)

}


})


})













app.get('/getLibAOP',(req,res)=>{


    db.query("SELECT * FROM afterolphy ORDER BY date",(err,result)=>{

        if(err){
            console.log(err)
        }else{


            res.send(result)
        }

    })
})
app.get('/deactLibAOP',(req,res)=>{

     
    var curdate =new Intl.DateTimeFormat('en-GB').format(new Date())
    var curmonth=curdate.substr(3,2)

db.query("SELECT * FROM afterolphy WHERE MONTH(date) < MONTH(CURDATE()) order BY date",(err,result)=>{

if(err){
   console.log(err)
}else{

   res.send(result)
   console.log(curmonth)
  // console.log(result)

}


})


})


app.get('/getLibAOC',(req,res)=>{


    db.query("SELECT * FROM afterolcmath ORDER BY date",(err,result)=>{

        if(err){
            console.log(err)
        }else{


            res.send(result)
        }

    })
})
app.get('/deactLibAOC',(req,res)=>{

     
    var curdate =new Intl.DateTimeFormat('en-GB').format(new Date())
    var curmonth=curdate.substr(3,2)

db.query("SELECT * FROM afterolcmath WHERE MONTH(date) < MONTH(CURDATE()) order BY date",(err,result)=>{

if(err){
   console.log(err)
}else{

   res.send(result)
   console.log(curmonth)
  // console.log(result)

}


})


})

app.get('/get_link',(req,res)=>{

    db.query("SELECT * from class_link where class_date=CURDATE()",(err,result)=>{

        if(err){
            console.log(err)
        }else{


            res.send(result)
        }
    })

})

// app.post('/dragAndDrop',(req,res)=>{

//     const file=req.files.dragdrop


//     const fileName = file.name;
//     console.log(fileName);
//     const uuidname = uuid.v1(); // this is used for unique file name
//     const filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
//  const  insertData = "INSERT INTO class_works(class_works) VALUES(?)";
//     db.query(insertData, [filesrc], (err, result) => {
//         if (err) throw err
//         file.mv('public/docs/' + uuidname + file.name)
//         res.send("Data successfully save")
//         console.log(result)
//     })

// })


app.post('/fileupload',(req,res)=>{

    

    if(req.files==null)
    {

        return res.status(400).json({msg:'no file uploaded'})

    }
    const file=req.files.file
    const fileName = file.name;
    console.log(fileName);
    const uuidname = uuid.v1(); // this is used for unique file name
    const filesrc = 'classWork' + uuidname + file.name
 const  insertData = "INSERT INTO class_works(class_works) VALUES(?)";
    db.query(insertData, [filesrc], (err, result) => {
        if (err) throw err
        file.mv(`${__dirname}/public/docs/${file.name}`,err=>{
            if(err){
                console.err(err);
                return res.status(500).send(err);
            }
            res.json({fileName: file.name, filePath:`/docs/${file.name}`})
        })
    })


    



})


app.post('/update_g10m',function(req,res){

    var ino=req.body.std_id;
    

    var setvideo=req.body.setvideo;
    var setnote=req.body.setnote;
    var note=JSON.stringify(req.body.note);
    var video=JSON.stringify(req.body.video);
    console.log(setnote)


  
  
    db.query("UPDATE grade10math SET "+ setnote+"="+note+", "+ setvideo+"="+video+" WHERE id="+ino+";",function(err,result){
        if(err) throw err;
        console.log(err);

        
        res.render('view_g10m',{
            result:result
            

            


        })

    })
})
app.post('/update_g10s',function(req,res){

    var ino=req.body.std_id;
    

    var setvideo=req.body.setvideo;
    var setnote=req.body.setnote;
    var note=JSON.stringify(req.body.note);
    var video=JSON.stringify(req.body.video);
    console.log(setnote)


  
  
    db.query("UPDATE grade10sci SET "+ setnote+"="+note+", "+ setvideo+"="+video+" WHERE id="+ino+";",function(err,result){
        if(err) throw err;
        console.log(err);

        
        res.render('view_g10s',{
            result:result
            

            


        })

    })
})
app.post('/update_g10h',function(req,res){

    var ino=req.body.std_id;
    

    var setvideo=req.body.setvideo;
    var setnote=req.body.setnote;
    var note=JSON.stringify(req.body.note);
    var video=JSON.stringify(req.body.video);
    console.log(setnote)


  
  
    db.query("UPDATE grade10history SET "+ setnote+"="+note+", "+ setvideo+"="+video+" WHERE id="+ino+";",function(err,result){
        if(err) throw err;
        console.log(err);

        
        res.render('view_g10h',{
            result:result
            

            


        })

    })
})
app.post('/update_g11m',function(req,res){

    var ino=req.body.std_id;
    

    var setvideo=req.body.setvideo;
    var setnote=req.body.setnote;
    var note=JSON.stringify(req.body.note);
    var video=JSON.stringify(req.body.video);
    console.log(setnote)


  
  
    db.query("UPDATE grade11math SET "+ setnote+"="+note+", "+ setvideo+"="+video+" WHERE id="+ino+";",function(err,result){
        if(err) throw err;
        console.log(err);

        
        res.render('view_g11m',{
            result:result
            

            


        })

    })
})

app.post('/update_g11s',function(req,res){

    var ino=req.body.std_id;
    

    var setvideo=req.body.setvideo;
    var setnote=req.body.setnote;
    var note=JSON.stringify(req.body.note);
    var video=JSON.stringify(req.body.video);
    console.log(setnote)


  
  
    db.query("UPDATE grade11sci SET "+ setnote+"="+note+", "+ setvideo+"="+video+" WHERE id="+ino+";",function(err,result){
        if(err) throw err;
        console.log(err);

        
        res.render('view_g11s',{
            result:result
            

            


        })

    })
})
app.post('/update_g11h',function(req,res){

    var ino=req.body.std_id;
    

    var setvideo=req.body.setvideo;
    var setnote=req.body.setnote;
    var note=JSON.stringify(req.body.note);
    var video=JSON.stringify(req.body.video);
    console.log(setnote)


  
  
    db.query("UPDATE grade11history SET "+ setnote+"="+note+", "+ setvideo+"="+video+" WHERE id="+ino+";",function(err,result){
        if(err) throw err;
        console.log(err);

        
        res.render('view_g11h',{
            result:result
            

            


        })

    })
})
app.post('/update_g10sin',function(req,res){

    var ino=req.body.std_id;
    

    var setvideo=req.body.setvideo;
    var setnote=req.body.setnote;
    var note=JSON.stringify(req.body.note);
    var video=JSON.stringify(req.body.video);
    console.log(setnote)


  
  
    db.query("UPDATE grade10sinhala SET "+ setnote+"="+note+", "+ setvideo+"="+video+" WHERE id="+ino+";",function(err,result){
        if(err) throw err;
        console.log(err);

        
        res.render('view_g10sin',{
            result:result
            

            


        })

    })
})
app.post('/update_g11sin',function(req,res){

    var ino=req.body.std_id;
    

    var setvideo=req.body.setvideo;
    var setnote=req.body.setnote;
    var note=JSON.stringify(req.body.note);
    var video=JSON.stringify(req.body.video);
    console.log(setnote)


  
  
    db.query("UPDATE grade11sinhala SET "+ setnote+"="+note+", "+ setvideo+"="+video+" WHERE id="+ino+";",function(err,result){
        if(err) throw err;
        console.log(err);

        
        res.render('view_g11sin',{
            result:result
            

            


        })

    })
})
app.post('/update_g10e',function(req,res){

    var ino=req.body.std_id;
    

    var setvideo=req.body.setvideo;
    var setnote=req.body.setnote;
    var note=JSON.stringify(req.body.note);
    var video=JSON.stringify(req.body.video);
    console.log(setnote)


  
  
    db.query("UPDATE grade10english SET "+ setnote+"="+note+", "+ setvideo+"="+video+" WHERE id="+ino+";",function(err,result){
        if(err) throw err;
        console.log(err);

        
        res.render('view_g10e',{
            result:result
            

            


        })

    })
})
app.post('/update_g11e',function(req,res){

    var ino=req.body.std_id;
    

    var setvideo=req.body.setvideo;
    var setnote=req.body.setnote;
    var note=JSON.stringify(req.body.note);
    var video=JSON.stringify(req.body.video);
    console.log(setnote)


  
  
    db.query("UPDATE grade11english SET "+ setnote+"="+note+", "+ setvideo+"="+video+" WHERE id="+ino+";",function(err,result){
        if(err) throw err;
        console.log(err);

        
        res.render('view_g11e',{
            result:result
            

            


        })

    })
})




app.post('/update_aop',function(req,res){

    var ino=req.body.std_id;
    

    var setvideo=req.body.setvideo;
    var setnote=req.body.setnote;
    var note=JSON.stringify(req.body.note);
    var video=JSON.stringify(req.body.video);
    console.log(setnote)


  
  
    db.query("UPDATE afterolphy SET "+ setnote+"="+note+", "+ setvideo+"="+video+" WHERE id="+ino+";",function(err,result){
        if(err) throw err;
        console.log(err);

        
        res.render('view_aop',{
            result:result
            

            


        })

    })
})
app.post('/update_aoc',function(req,res){

    var ino=req.body.std_id;
    

    var setvideo=req.body.setvideo;
    var setnote=req.body.setnote;
    var note=JSON.stringify(req.body.note);
    var video=JSON.stringify(req.body.video);
    console.log(setnote)


  
  
    db.query("UPDATE afterolcmath SET "+ setnote+"="+note+", "+ setvideo+"="+video+" WHERE id="+ino+";",function(err,result){
        if(err) throw err;
        console.log(err);

        
        res.render('view_aoc',{
            result:result
            

            


        })

    })
})
app.post('/activate',(req,res)=>{

    const id=req.body.std_id;


    db.query(`UPDATE students SET status="activate" WHERE std_id=`+id+`;`,(err,result)=>{

        if(err) throw err;
        console.log(err);
        res.render('student_view',{
            result:result


    })


})

})
app.post('/deactivate',(req,res)=>{

    const id=req.body.std_id;


    db.query(`UPDATE students SET status="deactivate" WHERE std_id=`+id+`;`,(err,result)=>{

        if(err) throw err;
        console.log(err);
        res.render('student_view',{
            result:result


    })


})

})
app.get('/logout_req',(req,res)=>{

    req.session.destroy();

    res.send("logout successfully!");
    console.log("logout successfully!")

})


app.listen(3001, () => {

 

    console.log("App run on port 3001");
  
});