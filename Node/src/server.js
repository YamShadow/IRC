import express from 'express'
import path from 'path'
import httpBase from 'http'
import ioBase from 'socket.io'

//equivalent du htmlspécialchars
let ent = require('ent')
let mysql = require('mysql')
const app = express()
const http = httpBase.Server(app)
const io = ioBase(http)

const PUBLIC_PATH = path.join(path.dirname(__dirname), 'public')
const CHAT_PATH = path.join(PUBLIC_PATH, 'chat.html')
let users = {}

let connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "chatbot"
});
connection.connect()

//Initialise la route / en get
app.get('/', (req, res) => {
    res.sendFile(CHAT_PATH)
})

let salons = []

//permet de recuperer tous les salons existants
let sql = "select * from salons"
callSQL(sql, function(err,data){
    if (err) {
        console.log("ERROR : ",err);            
    }else{            
        for(let d of data){
            salons.push(d.name.toLowerCase())
        } 
    }    
})

io.sockets.on('connection', (socket) => {

    //Route de connexion. Recuperer le pseudo/salon par un Get URL
    socket.on('new_user', function(pseudo, salon) {
        pseudo = ent.encode(pseudo)
        salon = ent.encode(salon)

        //Check si l'utilisateur est connu en base
        sql = "select * from users where pseudo='"+pseudo+"'"
        callSQL(sql, function(err,data){
            if (err)
                console.log("ERROR : ",err); 
            else{
                if(data.length < 1)
                    socket.emit('quit_user', 'close')
            }
        })
        socket.pseudo = pseudo
        users[socket.pseudo] = socket

        //verifie si le salon est connu
        socket.salon = checkSalons(socket, salon)

        socket.join(socket.salon)
        
        //recuperer les 10 derniers messages
        sql = "select users.pseudo, messages.message from messages join users on messages.emetteur = users.id where salon = (select id from salons where name='"+socket.salon+"') order by date_message DESC limit 10"
        callSQL(sql, function(err,data){
            if (err)
                console.log("ERROR : ",err); 
            else{            
                data.reverse()
                for(let m of data){
                    socket.emit('chat_message', {pseudo: m.pseudo, message: m.message})
                }
                //affiche un message de bienvenue dans le client du socket
                socket.emit('new_user', socket.pseudo)
            }    
        })

        //affiche un message chez les autres clients du même channel
        socket.broadcast.to(socket.salon).emit('new_user', socket.pseudo)
    });

    //Route de deconnexion
    socket.on('disconnect', function(){
        sql = "UPDATE `users` SET `connected` = '' WHERE `users`.`pseudo` = '"+socket.pseudo+"'"
        callSQL(sql, function(err,data){
            if (err)
                console.log("ERROR : ",err); 
        })

        socket.leave(socket.salon);
        //affiche un message chez les autres clients du même channel
        socket.to(socket.salon).broadcast.emit('goodbye_user', socket.pseudo)
    });

    //Route d'echange des messages
    socket.on('chat_message', function(msg){
        //msg = ent.encode(msg)
        //Comande /quit qui deconnecte le client
        if(msg.match('/quit')){
            socket.emit('quit_user', 'close')
        }
        //Commande /switchChannel [NAME] qui permet de move de channel
        else if(msg.match('/switch(.)*')) {
            let newChannel = msg.split(" ")[1]

            let oldChannel = socket.salon 
            socket.leave(socket.salon)
            socket.salon = checkSalons(socket, newChannel)
            socket.join(socket.salon)

            //Emet un message dans le tchat du client
            socket.emit('chat_messageBrute', 'Vous êtes connecter sur le channel '+ socket.salon)
            //Emet un message dans l'ancien salon 
            socket.broadcast.to(oldChannel).emit('chat_messageBrute', socket.pseudo +' a quitter le salon')

            //Emet un message dans le nouveau salon
            socket.broadcast.to(socket.salon).emit('chat_messageBrute', socket.pseudo +' a rejoint votre salon')
        }
        //Commande /msg PSEUDO MESSAGE
        else if(msg.match('/msg(.)*')){
            let split = msg.split(" ")
            let pseudoMsg = split[1]
            let message = ''
            for(let i= 2; i<split.length; i++){
                message += ' '+split[i]
            }  

            sql = "select * from users where pseudo='"+pseudoMsg+"'"
            callSQL(sql, function(err,data){
                if (err)
                    console.log("ERROR : ",err); 
                else{
                    if(data.length > 0){
                        console.log(data)
                        sql = "INSERT INTO messages_prives (message, emetteur, destinataire) VALUES ('"+ addslashes(message) +"', (select id from users where pseudo='"+socket.pseudo+"'),"+data[0].id+")"
                        callSQL(sql, function(err,data){
                            if (err)
                                console.log("ERROR : ",err); 
                        })
                        if(data[0].connected != ''){
                            socket.emit('chat_messagePrivate', socket.pseudo+" (vous avez chuchoté): "+message)
                            users[pseudoMsg].emit('chat_messagePrivate', socket.pseudo+" (murmure): "+message)
                        }

                    }else{
                        socket.emit('chat_messageBrute', "Le pseudo "+pseudoMsg+" ne correspond à aucun utilisateur...")
                    }
                }
            })

        }
        else{
            //Route par défauts
            sql = "INSERT INTO messages (message, emetteur, salon) VALUES ('"+ addslashes(msg) +"', (select id from users where pseudo='"+socket.pseudo+"'),(select id from salons where name='"+socket.salon+"'))"
            callSQL(sql, function(err,data){
                if (err)
                    console.log("ERROR : ",err); 
            })
            
            socket.emit('chat_message', {pseudo: socket.pseudo, message: msg})
            socket.to(socket.salon).broadcast.emit('chat_message', {pseudo: socket.pseudo, message: msg})     
        }
    });
})

http.listen(3000, () => console.log('LINK START 3000!'))

function callSQL(request, callback){
   // connection.connect()
    
    connection.query(request, function (error, results, fields) {
        if (error) 
            callback(error,null)
        else
            callback(null,results)
    });
    
    //connection.end()
}

function checkSalons(socket, salon){
    let retour
    if(salons.indexOf(salon.toLowerCase()) > 0){
        retour = salon.toLowerCase()
    }
    else{
        retour = salons[0]
    }

    sql = "UPDATE `users` SET `connected` = '"+socket.id+"',`channelConnected` = (select id from salons where name='"+retour+"')  WHERE `users`.`pseudo` = '"+socket.pseudo+"'"
    callSQL(sql, function(err,data){
        if (err)
            console.log("ERROR : ",err);
    })

    return retour
}

function addslashes(string) {
    return string.replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        replace(/'/g, '\\\'').
        replace(/"/g, '\\"');
}