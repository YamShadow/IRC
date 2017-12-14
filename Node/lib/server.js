'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var http = _http2.default.Server(app);
var io = (0, _socket2.default)(http);

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
    extended: true
}));

var PUBLIC_PATH = _path2.default.join(_path2.default.dirname(__dirname), 'public');
var CHAT_PATH = _path2.default.join(PUBLIC_PATH, 'chat.html');

var pseudos = {};
var pseudo = void 0;

var rooms = ['room1', 'room2', 'room3'];

app.get('/', function (req, res) {
    pseudo = req.param('pseudo');
    console.log('logged in: ', pseudo);

    res.sendFile(CHAT_PATH);
});

io.sockets.on('connection', function (socket) {
    io.emit('chat.message', pseudo + ' has connected');

    socket.on('adduser', function (username) {
        // store the username in the socket session for this client
        socket.username = username;
        // store the room name in the socket session for this client
        socket.room = 'room1';
        // add the client's username to the global list
        usernames[username] = username;
        // send client to room 1
        socket.join('room1');
        // echo to client they've connected
        socket.emit('updatechat', 'SERVER', 'you have connected to room1');
        // echo to room 1 that a person has connected to their room
        socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
        socket.emit('updaterooms', rooms, 'room1');
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
        io.emit('chat.message', pseudo + ' disconnected');
    });
    socket.on('chat.message', function (msg) {
        console.log('message: ' + msg.content);
        //io.emit('chat.message', pseudo+': '+msg.content);
        io.emit('chat.message', msg);
    });
});

http.listen(3000, function () {
    return console.log('Example app listening on port 3000!');
});
/*
function setCookie(name, value) {
    var today = new Date(), expires = new Date();
    expires.setTime(today.getTime() + (365*24*60*60*1000));
    this.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expires.toGMTString();
}
*/