import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import httpBase from 'http'
import ioBase from 'socket.io'

const app = express()
const http = httpBase.Server(app)
const io = ioBase(http)

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({
    extended: true
}))

const PUBLIC_PATH = path.join(path.dirname(__dirname), 'public');
const CHAT_PATH = path.join(PUBLIC_PATH, 'chat.html');

let pseudos = {};
let pseudo

let rooms = ['room1','room2','room3'];

app.get('/', (req, res) => {
    pseudo = req.params('pseudo')
    console.log('logged in: ', pseudo)
    
    res.sendFile(CHAT_PATH)
})

io.sockets.on('connection', (socket) => {
    io.emit('chat.message', pseudo+' has connected');

    socket.on('adduser', function(username){
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










    socket.on('disconnect', function(){
        console.log('user disconnected');
        io.emit('chat.message', pseudo+' disconnected');
      });
    socket.on('chat.message', function(msg){
        console.log('message: '+msg.content);
        //io.emit('chat.message', pseudo+': '+msg.content);
        io.emit('chat.message', msg);
    });
})

http.listen(3000, () => console.log('Example app listening on port 3000!'))
/*
function setCookie(name, value) {
    var today = new Date(), expires = new Date();
    expires.setTime(today.getTime() + (365*24*60*60*1000));
    this.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expires.toGMTString();
}
*/