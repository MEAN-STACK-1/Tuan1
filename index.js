//express
const express= require('express');
const app=express();
//router
app.get('/',function(req,res){
    res.send("hello ");
});
app.listen(1996,function(){
    console.log("connect sucsse");
});

// cookie-parser
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.get('/cookie-parser', function (req, res) {
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)
  
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
  })

//body-parser
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.username)
})

//express-session
var session = require('express-session')
// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// Access the session as req.session
app.get('/express-session', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})
//session-file-store
var FileStore = require('session-file-store')(session);
app.use(session({
    store: new FileStore(options),
    secret: 'keyboard cat'
}));
//mongoose
var mongoose = require('mongoose');
const config=require('./config/database');
//ket noi mongo
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, function(err) {
  if (err) {
    console.log('Could NOT connect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});
