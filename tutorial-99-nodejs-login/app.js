var express = require("express");
var app = express();
const jwt = require("jsonwebtoken");
const fs = require('fs')
const db = require('./db');

var users = require('./routes/users')
var products = require('./routes/products')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
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
    res.send('<html><body><h1>NodeJS MySQL CRUD Rest API JSON</h1></body></html>')
})
app.get('/jwt', (req, res) => {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    //let token = jwt.sign({ "body": "stuff" }, privateKey, { algorithm: 'HS256'});
    let token = jwt.sign({ "body": "stuff" }, privateKey, { algorithm: 'HS256'});
    res.send(token);
})
app.post("/login", function (req, res) {
	let s_username = req.body.username;
	let s_password = req.body.password;
    console.log(req.body);
    db.getConn((errdb, conn) => {
        if(errdb){ return res.status(500).send("Koneksi Gagal"); }
        conn.query('SELECT * FROM members where username=?', s_username, function (err, results, fields) {
            conn.release();
            if (err) { return res.status(400).send("Error") }
            if (results){
				if (results[0].password == s_password){
					//return res.json(results[0])
					let privateKey = fs.readFileSync('./private.pem', 'utf8');
					//let token = jwt.sign({ "body": "stuff" }, privateKey, { algorithm: 'HS256'});
					let payload = { 
						"member_name": results[0].member_name,
						"username": results[0].username, 
						"level": results[0].level, 
					}
					let token = jwt.sign(payload, privateKey, { algorithm: 'HS256'});
					res.send(token);
				} else {
					return res.status(401).json({ })
				}
			} else {
				return res.status(401).json({ })
			}
        });
    })
})

app.use('/api', users)
app.use('/api', products)

app.listen(3000, function(){
	console.log('Server running at port 3000: http://127.0.0.1:3000')
})

module.exports = app;