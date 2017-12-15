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

var ent = require('ent');
var app = (0, _express2.default)();
var http = _http2.default.Server(app);
var io = (0, _socket2.default)(http);

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
    extended: true
}));

var PUBLIC_PATH = _path2.default.join(_path2.default.dirname(__dirname), 'public');
var CHAT_PATH = _path2.default.join(PUBLIC_PATH, 'chat.html');

app.get('/', function (req, res) {
    res.sendFile(CHAT_PATH);
});

io.sockets.on('connection', function (socket) {

    socket.on('new_user', function (pseudo, salon) {
        pseudo = ent.encode(pseudo);
        salon = ent.encode(salon);
        socket.pseudo = pseudo;
        socket.salon = salon;
        socket.join(socket.salon);
        socket.emit('new_user', socket.pseudo);
        socket.broadcast.to(socket.salon).emit('new_user', socket.pseudo);
    });

    socket.on('disconnect', function () {
        socket.leave(socket.salon);
        socket.to(socket.salon).broadcast.emit('goodbye_user', socket.pseudo);
    });

    socket.on('chat_message', function (msg) {
        msg = ent.encode(msg);
        console.log(msg);
        console.log(msg.indexOf('switchChannel'));
        if (msg == '/quit') {
            console.log('commande ' + msg);
            socket.emit('quit_user', 'close');
        } else if (msg.indexOf('switchChannel') > 0) {
            var newChannel = msg.split(" ")[1];
            console.log(newChannel);

            socket.leave(socket.salon);
            socket.join(newChannel);

            socket.emit('switch_channel', 'Vous êtes connecter sur le channel ' + newChannel);
            socket.broadcast.to(socket.salon).emit('switch_channel', socket.pseudo + ' a quitter le salon');

            socket.salon = newChannel;
            socket.broadcast.to(newChannel).emit('switch_channel', socket.pseudo + ' a rejoint votre salon');
        } else {
            socket.emit('chat_message', { pseudo: socket.pseudo, message: msg });
            socket.to(socket.salon).broadcast.emit('chat_message', { pseudo: socket.pseudo, message: msg });
        }
    });
});

http.listen(3000, function () {
    return console.log('Example app listening on port 3000!');
});