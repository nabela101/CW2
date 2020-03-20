<<<<<<< HEAD
// load Express.js
const express = require('express')
const app = express()
var path = require('path')


// load bodyParser module for json payload parsing
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.urlencoded())

//app.use('/app.js', express.static('public'));
// connect to MongoDB
const MongoClient = require('mongodb').MongoClient
let db, users, courses;
MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    db = client.db('cw')
    users = db.collection("users")
    courses = db.collection("lessons")
})

const CourseID = require('mongodb').ObjectID;
const UserID = require('mongodb').ObjectID;

// get the collection name
app.param('lessons', (req, res, next, collectionName) => {
req.collection = db.collection(collectionName)
// console.log('collection name:', req.collection)
return next()
})

// dispaly a message for root path to show that API is working
app.get('/', function (req, res) {
res.send('Select a collection, e.g., /collections/lessons')
})

// retrieve all the objects from an collection
app.get('/collections/:lessons', (req, res) => {
    req.collection.find({}, { limit: 5, sort: [['price', -1]] }).toArray((e, results) => {
        if (e) return next(e)
        res.send(results)
    })
    
})
app.get('/registration', (req, res)=>{
    res.sendFile(path.join(__dirname + '/registration.html'))
})

app.post("/register", (req, res, next) => {
    users.insert(req.body, (error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result.result);
    });
});

app.get('/user/:email', (req, res)=>{
    users.findOne({Email: req.params.email }, (e, result) => {
        if (e) return next(e)
        res.send(result)
    })
    //res.send((`Email: ${req.params.email}`))
})

app.listen(3000)