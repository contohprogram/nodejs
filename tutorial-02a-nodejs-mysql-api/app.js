var express = require("express");
var app = express();

var users = require('./routes/users')

var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

var methodOverride = require('method-override')
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,recording-session,X-Auth-Token,Authorization");
	res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.options('*', function (req,res) { res.sendStatus(200); });

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api', users)

app.listen(3000, function(){
	console.log('Server running at port 3000: http://127.0.0.1:3000')
})

module.exports = app;