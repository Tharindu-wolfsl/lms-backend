const express = require("express");
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser')

var session=require('express-session')
var bodyparser = require("body-parser");
var path=require('path');

app.use(bodyparser());
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

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

app.use('/', registrationRouter);
app.use('/', loginRouter);
app.use('/', dashboardRouter);
app.use('/', logoutRouter);


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
// app.delete("/api/delete", (req, res) => {

//     const name = req.body.name

//     const sqlDelete = 'DELETE FROM crudtable WHERE name=?';
//     db.query(sqlDelete, name, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//     });

// });



app.listen(3001, () => {

    console.log("App run on port 3001");
});