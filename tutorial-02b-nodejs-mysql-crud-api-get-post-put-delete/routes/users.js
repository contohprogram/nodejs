var express = require('express')
var app = express()
const db = require('../db')

app.get('/users', function(req, res, next){
    db.getConn((errdb, conn)=>{
        if (errdb){ return res.status(500).send("Koneksi Gagal")}
        conn.query('SELECT * FROM users', (err, results, fields)=>{
            conn.release()
            if (err) {return res.status(400).send("Error")}
            res.json(results)
        })
    })
})

app.get('/users/:id', function(req, res, next){
    let id = req.params.id
    console.log(req.params)
    db.getConn((errdb, conn)=>{
        if (errdb){ return res.status(500).send("Koneksi Gagal")}
        conn.query('SELECT * FROM users WHERE id=?', id, (err, results, fields)=>{
            conn.release()
            if (err) {return res.status(400).send("Error")}
            res.json(results[0])
        })
    })
})

app.post('/users', function(req, res, next){
    let sid = req.body.id
    let sfirstname = req.body.first_name
    let slastname = req.body.last_name
    console.log(req.body)
    db.getConn((errdb, conn)=>{
        if (errdb){ return res.status(500).send("Koneksi Gagal")}
        conn.query('INSERT INTO users (id, first_name, last_name) VALUES(?, ?, ?)', [sid, sfirstname, slastname], (err, results, fields)=>{
            conn.release()
            if (err) {return res.status(400).send("Error")}
            res.json({})
        })
    })
})

app.put('/users/:id', function(req, res){
    let id = req.params.id
    let sid = req.body.id
    let sfirstname = req.body.first_name
    let slastname = req.body.last_name
    console.log(req.params)
    console.log(req.body)
    db.getConn((errdb, conn)=>{
        if (errdb){ return res.status(500).send("Koneksi Gagal")}
        conn.query('UPDATE users SET id=?, first_name=?, last_name=? WHERE id=?', [sid, sfirstname, slastname, id], (err, results, fields)=>{
            conn.release()
            if (err) {return res.status(400).send("Error")}
            res.json({})
        })
    })
})

app.delete('/users/:id', function(req, res){
    let id = req.params.id
    console.log(req.params)
    db.getConn((errdb, conn)=>{
        if (errdb){ return res.status(500).send("Koneksi Gagal")}
        conn.query('DELETE FROM users WHERE id=?', [id], (err, results, fields)=>{
            conn.release()
            if (err) {return res.status(400).send("Error")}
            res.json({})
        })
    })
})

module.exports = app