var express = require("express")
var app = express()

app.get("/", function(req, res){
    return res.send("Hello World")
})

app.listen(3000, function() {
    console.log("App is running at http://127.0.0.1:3000")
})