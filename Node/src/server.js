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
const LOGIN_PATH = path.join(PUBLIC_PATH, 'login.html');
const CHAT_PATH = path.join(PUBLIC_PATH, 'chat.html');
let pseudo;

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/login', (req, res) => res.sendFile(LOGIN_PATH))

app.post('/chat', (req, res) => {
    pseudo = req.body.pseudo
    console.log('logged in: ', pseudo)
    
    res.sendFile(CHAT_PATH)
})

io.on('connection', (socket) => {
    console.log(' a user connected')
    io.emit('chat.message', pseudo+' has connected');
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