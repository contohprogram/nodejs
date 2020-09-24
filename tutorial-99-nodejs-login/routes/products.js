var express = require('express')
var app = express()
const db = require('../db');

app.get('/products', function(req, res, next) {
	db.getConn((errdb, conn) => {
		if(errdb){ return res.status(500).send("Koneksi Gagal") }
		conn.query('SELECT * FROM products', (err, results, fields) => {
            conn.release();
            if (err) { return res.status(400).send("Error") }
			res.json(results)
			//res.json(JSON.parse(JSON.stringify(results)))
		})
	})
})

app.get("/products/:id", function (req, res) {
    let id = req.params.id;
    db.getConn((errdb, conn) => {
		if(errdb){ return res.status(500).send("Koneksi Gagal"); }
        conn.query('SELECT * FROM products where product_id=?', id, function (err, results, fields) {
            conn.release();
            if (err) { return res.status(400).send("Error") }
            return res.json(results[0])
        });
    });
});

app.post("/products", function (req, res) {
	let s_product_id = req.body.product_id;
	let s_product_name = req.body.product_name;
    let s_product_description = req.body.product_description;
    let s_product_image = req.body.product_image;
    console.log(req.body);
    db.getConn((errdb, conn) => {
        if(errdb){ return res.status(500).send("Koneksi Gagal"); }
        conn.query("INSERT INTO products (product_id, product_name, product_description, product_image) values(?, ?, ?, ?)", [s_product_id, s_product_name, s_product_description, s_product_image], function (err, results, fields) {
            if (err) { return res.status(400).send("Error") }
            return res.send({ })
        })
    })
})

app.put("/products/:id", function (req, res) {
    let id = req.params.id;
    let s_product_id = req.body.product_id;
	let s_product_name = req.body.product_name;
    let s_product_description = req.body.product_description;
    let s_product_image = req.body.product_image;
    console.log(req.params);
    console.log(req.body);
    db.getConn((errdb, conn) => {
		if(errdb){ return res.status(500).send("Koneksi Gagal"); }
        conn.query("UPDATE products SET product_id=?, product_name = ?, product_description = ?, product_image = ? WHERE product_id = ?" , [s_product_id, s_product_name, s_product_description, s_product_image, id] , function (err, results, fields) {
            if (err) { return res.status(400).send("Error") }
            return res.send({})
        });
    });
});

app.delete("/products/:id", function (req, res) {
    let id = req.params.id;
    console.log(req.params)
    db.getConn((errdb, conn) => {
		if(errdb){ return res.status(500).send("Koneksi Gagal"); }
        conn.query('DELETE FROM products WHERE product_id = ?', [id], function (err, results, fields) {
            conn.release()
            if (err) { return res.status(400).send("Error") }
            return res.send({ });
        });
    });
});

module.exports = app
