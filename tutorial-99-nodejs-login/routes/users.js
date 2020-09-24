var express = require('express')
var app = express()
const db = require('../db');
const auth = require('../auth');

app.get('/users', auth.isAuthorized, function(req, res, next) {
	db.getConn((errdb, conn) => {
		if(errdb){ return res.status(500).send("Koneksi Gagal") }
		conn.query('SELECT * FROM users', (err, results, fields) => {
            conn.release();
            if (err) { return res.status(400).send("Error") }
			res.json(results)
		})
	})
})

app.get("/users/:id", function (req, res) {
    let id = req.params.id;
    db.getConn((errdb, conn) => {
		if(errdb){ return res.status(500).send("Koneksi Gagal"); }
        conn.query('SELECT * FROM users where id=?', id, function (err, results, fields) {
            conn.release();
            if (err) { return res.status(400).send("Error") }
            return res.json(results[0])
        });
    });
});

app.post("/users", function (req, res) {
	let sid = req.body.id;
	let sfirstname = req.body.first_name;
    let slastname = req.body.last_name;
    console.log(req.body);
    db.getConn((errdb, conn) => {
        if(errdb){ return res.status(500).send("Koneksi Gagal"); }
        conn.query("INSERT INTO users (id, first_name, last_name) values(?, ?, ?)", [sid, sfirstname, slastname], function (err, results, fields) {
            if (err) { return res.status(400).send("Error") }
            return res.send({ })
        })
    })
})

app.put("/users/:id", function (req, res) {
    let id = req.params.id;
    let sid = req.body.id;
	let sfirstname = req.body.first_name;
    let slastname = req.body.last_name;
    console.log(req.params);
    console.log(req.body);
    db.getConn((errdb, conn) => {
		if(errdb){ return res.status(500).send("Koneksi Gagal"); }
        conn.query("UPDATE users SET id=?, first_name = ?, last_name = ? WHERE id = ?" , [sid, sfirstname, slastname, id] , function (err, results, fields) {
            if (err) { return res.status(400).send("Error") }
            return res.send({})
        });
    });
});

app.delete("/users/:id", function (req, res) {
    let id = req.params.id;
    console.log(req.params)
    db.getConn((errdb, conn) => {
		if(errdb){ return res.status(500).send("Koneksi Gagal"); }
        conn.query('DELETE FROM users WHERE id = ?', [id], function (err, results, fields) {
            conn.release()
            if (err) { return res.status(400).send("Error") }
            return res.send({ });
        });
    });
});

module.exports = app
