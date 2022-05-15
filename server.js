var http = require("http");
var mongoClient = require("mongodb").MongoClient;

var express = require("express");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var app = express();

app.use(express.json());
app.use(cors());
mongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        console.log("connection failed");
    }
    else {
        db = client.db("empdb");
        console.log("connection is succesfully completed");
    }
});
app.get('/emps', (req, res) => {
    db.collection("emp").find().toArray((err, items) => {
        res.write(JSON.stringify(items));
        res.end();
    });
})

app.post('/addemp', (req, res) => {
    db.collection('emp').insertOne(req.body);
    res.write('Data inserted');
    res.end();
})

app.put('/updateemp/:id', (req, res) => {
    var id = parseInt(req.params.id);
    db.collection("emp").update({ "_id": id }, { $set: { name: req.body.name } });
    res.write('Data updated');
    res.end();
});

app.delete('/deleteemp/:id', (req, res) => {
    var id = parseInt(req.params.id);
    db.collection('emp').remove({ "_id": id });
    res.write('Data deleted');
    res.end();
})

app.listen(5000, () => {
    console.log("server is listening");
})

