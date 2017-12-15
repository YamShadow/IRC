import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import httpBase from 'http'
import ioBase from 'socket.io'

//equivalent du htmlspécialchars
let ent = require('ent')
const app = express()
const http = httpBase.Server(app)
const io = ioBase(http)

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({
    extended: true
}))

const PUBLIC_PATH = path.join(path.dirname(__dirname), 'public')
const CHAT_PATH = path.join(PUBLIC_PATH, 'chat.html')

//Initialise la route / en get
app.get('/', (req, res) => {
    res.sendFile(CHAT_PATH)
})

io.sockets.on('connection', (socket) => {

    //Route de connexion. Recuperer le pseudo/salon par un Get URL
    socket.on('new_user', function(pseudo, salon) {
        pseudo = ent.encode(pseudo)
        salon = ent.encode(salon)
        socket.pseudo = pseudo
        socket.salon = salon
        socket.join(socket.salon)
        //affiche un message de bienvenue dans le client du socket
        socket.emit('new_user', socket.pseudo)
        //affiche un message chez les autres clients du même channel
        socket.broadcast.to(socket.salon).emit('new_user', socket.pseudo)
    });

    //Route de deconnexion
    socket.on('disconnect', function(){
        socket.leave(socket.salon);
        //affiche un message chez les autres clients du même channel
        socket.to(socket.salon).broadcast.emit('goodbye_user', socket.pseudo)
    });

    //Route d'echange des messages
    socket.on('chat_message', function(msg){
        msg = ent.encode(msg)
        //Comande /quit qui deconnecte le client
        if(msg == '/quit'){
            socket.emit('quit_user', 'close')
        }
        //Commande /switchChannel [NAME] qui permet de move de channel
        else if(msg.indexOf('switchChannel') > 0) {
            let newChannel = msg.split(" ")[1]

            socket.leave(socket.salon)
            socket.join(newChannel)

            //Emet un message dans le tchat du client
            socket.emit('switch_channel', 'Vous êtes connecter sur le channel '+ newChannel)
            //Emet un message dans l'ancien salon 
            socket.broadcast.to(socket.salon).emit('switch_channel', socket.pseudo +' a quitter le salon')

            socket.salon = newChannel
            //Emet un message dans le nouveau salon
            socket.broadcast.to(newChannel).emit('switch_channel', socket.pseudo +' a rejoint votre salon')
        }else{
            //Route par défauts
            socket.emit('chat_message', {pseudo: socket.pseudo, message: msg})
            socket.to(socket.salon).broadcast.emit('chat_message', {pseudo: socket.pseudo, message: msg})     
        }
    });
})

http.listen(3000, () => console.log('Serveur en route sur le port 3000!'))