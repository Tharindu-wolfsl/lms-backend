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

app.post("/api/insert", (req, res) => {
    
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
    db.query("Delete FROM course_category WHERE Id="+ino+";",function(err,result){
        
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
                
                
	             var insertData = "INSERT INTO course_category(course_name) VALUES(?)";
	             db.query(insertData, [course_name], (err, result) => {
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

        req.session.user=result
        console.log(req.session.user)
       
        res.json({auth:true,token:token,result:result});
    }
    else{

        res.json({auth:false,message:"No rigth user name password combination"});
    }
    

})

})

//api request
app.get('/isUserAuth',verifyJWT,(req,res)=>{

    res.send("Authentication success");
    
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
   
    var video_src=req.body.video;
    var week1=req.body.week1;
    var week2=req.body.week2;
    var week3=req.body.week3;
    var week4=req.body.week4;
   
    
    //  var fileName = file.name;
    //  console.log(fileName);
    //  var uuidname = uuid.v1(); // this is used for unique file name
    //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
     var insertData = "INSERT INTO grade10math(date,medium,video,week1,week2,week3,week4) VALUES(?,?,?,?,?,?,?)";
     db.query(insertData, [class_date,medium,video_src,week1,week2,week3,week4], (err, result) => {
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




//g10s

app.post('/create_g10s',(req,res)=>{

  
    var class_date=req.body.date;
            
    var medium=req.body.medium;
   
    var video_src=req.body.video;
    var week1=req.body.week1;
    var week2=req.body.week2;
    var week3=req.body.week3;
    var week4=req.body.week4;
   
    
    //  var fileName = file.name;
    //  console.log(fileName);
    //  var uuidname = uuid.v1(); // this is used for unique file name
    //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
     var insertData = "INSERT INTO grade10sci(date,medium,video,week1,week2,week3,week4) VALUES(?,?,?,?,?,?,?)";
     db.query(insertData, [class_date,medium,video_src,week1,week2,week3,week4], (err, result) => {
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
   
    var video_src=req.body.video;
    var week1=req.body.week1;
    var week2=req.body.week2;
    var week3=req.body.week3;
    var week4=req.body.week4;
   
    
    //  var fileName = file.name;
    //  console.log(fileName);
    //  var uuidname = uuid.v1(); // this is used for unique file name
    //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
     var insertData = "INSERT INTO grade11math(date,medium,video,week1,week2,week3,week4) VALUES(?,?,?,?,?,?,?)";
     db.query(insertData, [class_date,medium,video_src,week1,week2,week3,week4], (err, result) => {
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
               
                var video_src=req.body.video;
                var week1=req.body.week1;
                var week2=req.body.week2;
                var week3=req.body.week3;
                var week4=req.body.week4;
               
                
	            //  var fileName = file.name;
	            //  console.log(fileName);
	            //  var uuidname = uuid.v1(); // this is used for unique file name
	            //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
	             var insertData = "INSERT INTO grade11sci(date,medium,video,week1,week2,week3,week4) VALUES(?,?,?,?,?,?,?)";
	             db.query(insertData, [class_date,medium,video_src,week1,week2,week3,week4], (err, result) => {
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


//aop
app.post('/create_aop',(req,res)=>{

   
    var class_date=req.body.date;
            
    var medium=req.body.medium;
   
    var video_src=req.body.video;
    var week1=req.body.week1;
    var week2=req.body.week2;
    var week3=req.body.week3;
    var week4=req.body.week4;
   
    
    //  var fileName = file.name;
    //  console.log(fileName);
    //  var uuidname = uuid.v1(); // this is used for unique file name
    //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
     var insertData = "INSERT INTO afterolphy(date,medium,video,week1,week2,week3,week4) VALUES(?,?,?,?,?,?,?)";
     db.query(insertData, [class_date,medium,video_src,week1,week2,week3,week4], (err, result) => {
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
   
    var video_src=req.body.video;
    var week1=req.body.week1;
    var week2=req.body.week2;
    var week3=req.body.week3;
    var week4=req.body.week4;
   
    
    //  var fileName = file.name;
    //  console.log(fileName);
    //  var uuidname = uuid.v1(); // this is used for unique file name
    //  var filesrc = 'http://127.0.0.1:3001/docs/' + uuidname + file.name
     var insertData = "INSERT INTO afterolmath(date,medium,video,week1,week2,week3,week4) VALUES(?,?,?,?,?,?,?)";
     db.query(insertData, [class_date,medium,video_src,week1,week2,week3,week4], (err, result) => {
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
app.get('/getLibM11',(req,res)=>{


    db.query("SELECT * FROM grade11math ORDER BY date",(err,result)=>{

        if(err){
            console.log(err)
        }else{


            res.send(result)
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

app.get('/getLibM10',(req,res)=>{


    db.query("SELECT * FROM grade10math ORDER BY date",(err,result)=>{

        if(err){
            console.log(err)
        }else{


            res.send(result)
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

app.get('/getLibAOM',(req,res)=>{


    db.query("SELECT * FROM afterolcmath ORDER BY date",(err,result)=>{

        if(err){
            console.log(err)
        }else{


            res.send(result)
        }

    })
})
























app.listen(3001, () => {

 

    console.log("App run on port 3001");
  
});