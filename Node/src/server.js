import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import httpBase from 'http'
import ioBase from 'socket.io'
let ent = require('ent');

const app = express()
const http = httpBase.Server(app)
const io = ioBase(http)

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({
    extended: true
}))

const PUBLIC_PATH = path.join(path.dirname(__dirname), 'public');
const CHAT_PATH = path.join(PUBLIC_PATH, 'chat.html');

app.get('/', (req, res) => {
    res.sendFile(CHAT_PATH)
})

io.sockets.on('connection', (socket) => {

    socket.on('new_user', function(pseudo, salon) {
        pseudo = ent.encode(pseudo);
        salon = ent.encode(salon);
        socket.pseudo = pseudo
        socket.salon = salon
        socket.join(socket.salon);
        socket.emit('new_user', socket.pseudo)
        socket.broadcast.to(socket.salon).emit('new_user', socket.pseudo)
    });

    socket.on('disconnect', function(){
        socket.to(socket.salon).broadcast.emit('goodbye_user', socket.pseudo)
      });

    socket.on('chat_message', function(msg){
        msg = ent.encode(msg)
        if(msg == '/quit'){
            console.log('commande '+msg);
            socket.emit('quit_user', 'close');
        }else{
            socket.emit('chat_message', {pseudo: socket.pseudo, message: msg});
            socket.to(socket.salon).broadcast.emit('chat_message', {pseudo: socket.pseudo, message: msg})     
        }
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