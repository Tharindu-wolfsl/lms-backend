var express=require('express');
var session=require('express-session')
var bodyparser = require("body-parser");
var path=require('path');
var app=express();
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


app.listen(3002, () => {

    console.log("App run on port 3002");
});