var express = require('express');
var app = express();
var http = require('http').Server(app); // create https server : http://stackoverflow.com/questions/11744975/enabling-https-on-express-js
var io = require('socket.io')(http);

var cors = require('cors');

var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

//enable CORS
app.use(cors());
app.options('*', cors());

//upload file
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/app/uploads')
    },
    filename: function (req, file, cb) {
        //cb(null, file.fieldname + '-' + Date.now())
        cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({ storage: storage });
//var upload = multer({ dest: __dirname + '/app/uploads' });



// System wide config
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '50mb'}));// parse application/json
app.use('/', express.static(__dirname + '/app'));


// CMS database const
DB = db = undefined;
const DB_USERNAME = 'cmsUser';
const DB_PASSWORD = 'pass1234';
const DB_PORT = '8817';

// CMS Global Constant
LI_ROOT_DIR = __dirname;
SESSION_TIMEOUT_SECONDS = 3600;

// CMS Global Route
var route = require('./server/route');
route.config(express, app, upload);

//get absolute uncaught Exceptions here
process.on('uncaughtException', function(err) {
    console.log('=============> Caught exception: ' + err);
});
//get uncaught application Exceptions here
app.use(function(err, req, res, next) {
    //res.end(err.message); // this catches the error!!
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    } else {
        next(err)
    }
});


// Express starter (will connection MongoDB First)
MongoClient.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@localhost:${DB_PORT}/cms`, (err, database) => {
    if (err) {
        return console.log(err);
    }
    var database = database.db("cms");
    db = database;

    var portNumber = 8888;
    ///// ExpressJS only:
    // app.listen(portNumber, function () {
    //     console.log(`App listening on port ${portNumber}!`);
    // });
    ///// ExpressJS with socket.io
    http.listen(portNumber, function () {
        console.log(`App with socket.io listening on port ${portNumber}!`);
    });

});



//Socket IO chat
var histories = [];
io.on('connection', function (socket) {
    socket.on('load history', function (msg) {
        // http://michaelheap.com/sending-messages-to-certain-clients-with-socket-io/
        io.sockets.connected[socket.id].emit("load history", histories);
        console.log("socket.id = ", socket.id);
    });

    socket.on('chat message', function (msg) {
        histories.push(msg);
        io.emit('chat message', msg);
    });

    socket.on('cmd', function (msg) {
        if (msg == 'clear') {
            histories = [];
            console.log('Server side history cleared.');
        }
    });
});