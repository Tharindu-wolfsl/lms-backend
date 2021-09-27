var express = require('express');
var router = express.Router();
var app=express();

app.set('view engine', 'html');

/* GET users listing. */
router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/login');
});
module.exports = router;