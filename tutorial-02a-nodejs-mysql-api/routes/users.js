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

module.exports = app