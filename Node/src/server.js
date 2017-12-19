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
})
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
        console.log("ERROR : ",err)      
    }else{            
        for(let d of data){
            salons.push(d.nom.toLowerCase())
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
                console.log("ERROR : ",err)
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
        sql = "select users.pseudo, messages.message from messages join users on messages.emetteur = users.id where salon = (select id from salons where nom='"+socket.salon+"') order by date_message DESC limit 10"
        callSQL(sql, function(err,data){
            if (err)
                console.log("ERROR : ",err)
            else{            
                data.reverse()
                for(let m of data){
                    socket.emit('chat_message', {pseudo: m.pseudo, message: ent.decode(m.message)})
                }
                //affiche un message de bienvenue dans le client du socket
                socket.emit('new_user', {pseudo: socket.pseudo, salon: socket.salon})
            }    
        })

        //affiche un message chez les autres clients du même channel
        socket.broadcast.to(socket.salon).emit('new_user', {pseudo: socket.pseudo, salon: socket.salon})
    })

    //Route de deconnexion
    socket.on('disconnect', function(){
        sql = "UPDATE `users` SET `connected` = '' WHERE `users`.`pseudo` = '"+socket.pseudo+"'"
        callSQL(sql, function(err,data){
            if (err)
                console.log("ERROR : ",err)
        })

        socket.leave(socket.salon)
        //affiche un message chez les autres clients du même channel
        socket.to(socket.salon).broadcast.emit('goodbye_user', socket.pseudo)
    })

    //Route d'echange des messages
    socket.on('chat_message', function(msg){
        if(msg != ''){
            switch(msg.split(' ', 1)[0]){
                case '/quit': 
                    socket.emit('quit_user', 'close')
                    delete users[socket.pseudo]
                    break
                case '/switch':
                    let newChannel = msg.split(" ")[1]
                
                    let oldChannel = socket.salon 
                    socket.leave(socket.salon)
                    socket.salon = checkSalons(socket, newChannel, oldChannel)
                
                    if(socket.salon != oldChannel){
                        socket.join(socket.salon)
                        //Emet un message dans le tchat du client
                        socket.emit('chat_messageBrute', 'Vous êtes connecter sur le channel '+ socket.salon)
                        //Emet un message dans l'ancien salon 
                        socket.broadcast.to(oldChannel).emit('chat_messageBrute', socket.pseudo +' a quitter le salon')
                        //Emet un message dans le nouveau salon
                        socket.broadcast.to(socket.salon).emit('chat_messageBrute', socket.pseudo +' a rejoint votre salon')
                    }
                    break
                case '/kick':
                    let splitKick = msg.split(" ")
                    let pseudoKick = splitKick[1]
                    users[pseudoKick].emit('quit_user', 'close')                
                    delete users[pseudoKick]
                    break
                case '/msg':
                    let split = msg.split(" ")
                    let pseudoMsg = split[1]
                    let message = ''
                    for(let i= 2; i<split.length; i++){
                        message += ' '+split[i]
                    }  

                    sql = "select * from users where pseudo='"+pseudoMsg+"'"
                    callSQL(sql, function(err,data){
                        if (err)
                            console.log("ERROR : ",err)
                        else{
                            if(data.length > 0){
                                sql = "INSERT INTO messages_prives (message, emetteur, destinataire) VALUES ('"+ ent.encode(addslashes(message.trim())) +"', (select id from users where pseudo='"+socket.pseudo+"'),"+data[0].id+")"
                                callSQL(sql, function(err,data){
                                    if (err)
                                        console.log("ERROR : ",err)
                                })
                                if(data[0].connected != ''){
                                    socket.emit('chat_messagePrivate', socket.pseudo+" (vous avez chuchoté): "+message)
                                    users[pseudoMsg].emit('chat_messagePrivate', socket.pseudo+" (murmure): "+message)
                                    users[pseudoMsg].lastMsgPseudo = socket.pseudo
                                }

                            }else{
                                socket.emit('chat_messageBrute', "Le pseudo "+pseudoMsg+" ne correspond à aucun utilisateur...")
                            }
                        }
                    })
                    break
                case '/r':
                    let splitReponse = msg.split(" ")
                    let messageReponse = ''
                    for(let i= 1; i<splitReponse.length; i++){
                        messageReponse += ' '+splitReponse[i]
                    }  

                    sql = "select * from users where pseudo='"+socket.lastMsgPseudo+"'"
                    callSQL(sql, function(err,data){
                        if (err)
                            console.log("ERROR : ",err)
                        else{
                            if(data.length > 0){
                                sql = "INSERT INTO messages_prives (message, emetteur, destinataire) VALUES ('"+ ent.encode(addslashes(messageReponse.trim())) +"', (select id from users where pseudo='"+socket.pseudo+"'),"+data[0].id+")"
                                callSQL(sql, function(err,data){
                                    if (err)
                                        console.log("ERROR : ",err)
                                })
                                if(data[0].connected != ''){
                                    socket.emit('chat_messagePrivate', socket.pseudo+" (vous avez chuchoté): "+messageReponse)
                                    users[socket.lastMsgPseudo].emit('chat_messagePrivate', socket.pseudo+" (murmure): "+messageReponse)
                                    users[socket.lastMsgPseudo].lastMsgPseudo = socket.pseudo
                                    delete socket.lastMsgPseudo
                                }
                            }else{
                                socket.emit('chat_messageBrute', "Le pseudo "+pseudoMsg+" ne correspond à aucun utilisateur...")
                            }
                        }
                    })
                    break
                case '/invite':
                    let splitInvite = msg.split(" ")
                    let pseudoInvite = splitInvite[1]

                    if(socket.pseudo != pseudoInvite){
                        sql = "select * from users where pseudo='"+pseudoInvite+"'"
                        callSQL(sql, function(err,data){
                            if (err)
                                console.log("ERROR : ",err)
                            else{
                                if(data.length > 0){
                                    sql = "SELECT etat FROM `amis` WHERE (`personne_a` = (select id from users where pseudo='"+socket.pseudo+"') and `personne_b` = (select id from users where pseudo='"+pseudoInvite+"')) || (`personne_a` = (select id from users where pseudo='"+pseudoInvite+"') and `personne_b` = (select id from users where pseudo='"+socket.pseudo+"'))"
                                    callSQL(sql, function(err,data){
                                        if (err)
                                            console.log("ERROR : ",err)
                                        if(data.length <= 0){
                                            sql = "INSERT INTO `amis` (`id`, `personne_a`, `personne_b`, `etat`) VALUES (NULL, (select id from users where pseudo='"+socket.pseudo+"'), (select id from users where pseudo='"+pseudoInvite+"'), '1')"
                                            callSQL(sql, function(err,data){
                                                if (err)
                                                    console.log("ERROR : ",err)
                                                else{
                                                    socket.emit('chat_messageBrute', "Une demande d'ami a été envoyée a "+pseudoInvite)
                                                    users[pseudoInvite].emit('chat_messageBrute', socket.pseudo+" souhaite devenir votre ami !")
                                                }
                                            })
                                        }else{
                                            switch(data[0].etat){
                                                case 1:
                                                    socket.emit('chat_messageBrute', "Une invitation est déjà en cours avec "+pseudoInvite)
                                                    break
                                                case 2:
                                                    socket.emit('chat_messageBrute', pseudoInvite+" refuse d'être votre ami ! Prenez un Curly !")
                                                    break
                                                case 3:
                                                    socket.emit('chat_messageBrute', "Votre invitation à "+pseudoInvite+" a expirée !")
                                                    break
                                                case 4:
                                                    socket.emit('chat_messageBrute', "Invitation indésirable pour "+pseudoInvite+" !")
                                                    break
                                                case 5:
                                                    socket.emit('chat_messageBrute', "Vous êtes déjà ami avec "+pseudoInvite+" !")
                                                    break
                                                default:
                                                    socket.emit('chat_messageBrute', "Bug de la matrice !")
                                                    break
                                            }
                                        }
                                    })
                                }else{
                                    socket.emit('chat_messageBrute', "Le pseudo "+pseudoInvite+" ne correspond à aucun utilisateur...")
                                }
                            }
                        })
                    }
                    break
                case '/friendlist':
                    sql = "SELECT DISTINCT users.pseudo FROM users join amis on users.id = amis.personne_a or users.id = amis.personne_b where (amis.personne_a = (select id from users where pseudo='"+socket.pseudo+"') or amis.personne_b = (select id from users where pseudo='"+socket.pseudo+"')) and users.id != (select id from users where pseudo='"+socket.pseudo+"') and amis.etat = 2 order by pseudo ASC"
                    callSQL(sql, function(err,data){
                        if (err)
                            console.log("ERROR : ",err)
                        else{
                            let listeAmi = false
                            for(let ami of data){
                                if(listeAmi)
                                    listeAmi += ', '+ami.pseudo
                                else
                                    listeAmi = ami.pseudo
                            }
                            if(!listeAmi)
                                socket.emit('chat_messageBrute', "Vous n'avez aucun amis... ")
                            else
                                socket.emit('chat_messageBrute', "Vos amis sont : "+listeAmi)
                        }
                    })
                    break
                case '/acceptFriend':
                    let splitAccepte = msg.split(" ")
                    let pseudoAccepte = splitAccepte[1]
                    sql = "UPDATE `amis` SET `etat` = '5' WHERE `amis`.`personne_a` = (select id from users where pseudo='"+pseudoAccepte+"') and `amis`.`personne_b` = (select id from users where pseudo='"+socket.pseudo+"')"
                    callSQL(sql, function(err,data){
                        if (err)
                            console.log("ERROR : ",err)
                        else{
                            if(data.affectedRows > 0){
                                socket.emit('chat_messageBrute', pseudoAccepte+" est maintenant votre ami !")
                                users[pseudoAccepte].emit('chat_messageBrute', socket.pseudo+" a accepté votre demande !")
                            }
                        }
                    })
                    break
                case '/declineFriend':
                    let splitRefuse = msg.split(" ")
                    let pseudoRefuse = splitRefuse[1]
                    sql = "UPDATE `amis` SET `etat` = '2' WHERE `amis`.`personne_a` = (select id from users where pseudo='"+pseudoRefuse+"') and `amis`.`personne_b` = (select id from users where pseudo='"+socket.pseudo+"')"
                    callSQL(sql, function(err,data){
                        if (err)
                            console.log("ERROR : ",err)
                        else{
                            if(data.affectedRows > 0){
                                socket.emit('chat_messageBrute', "La demande de "+pseudoRefuse+" a été réfusé !")
                                users[pseudoRefuse].emit('chat_messageBrute', socket.pseudo+" a refusé votre demande !")
                            }
                        }
                    })
                    break
                case '/roomList':
                    sql = "SELECT * FROM `salons` order by nom ASC"
                    callSQL(sql, function(err,data){
                        if (err)
                            console.log("ERROR : ",err)
                        else{
                            let listeRoom = false
                            for(let room of data){
                                if(listeRoom)
                                    listeRoom += ', '+room.nom
                                else
                                    listeRoom = room.nom
                            }
                            socket.emit('chat_messageBrute', "Les salons sont : "+listeRoom)
                        }
                    })
                    break
                case '/createRoom':
                    let splitCreateRoom = msg.split(" ")
                    let nameCreateRoom = splitCreateRoom[1]
                    if(nameCreateRoom != undefined){
                        sql = "INSERT INTO `salons` (`nom`, `type_salon`) VALUES ('"+nameCreateRoom+"', '1')"
                        callSQL(sql, function(err,data){
                            if (err)
                                console.log("ERROR : ",err)
                            else{
                                console.log(data)
                                if(data.affectedRows > 0){
                                    socket.emit('chat_messageBrute', "Le salon "+nameCreateRoom+" a été crée !")
                                    salons.push(nameCreateRoom)
                                }
                            }
                        })
                    }else
                        socket.emit('chat_messageBrute', "Veuillez saisir un nom de salon valide !")
                    break
                case '/online':
                    sql = "SELECT * FROM `users` where connected = 1 order by pseudo ASC"
                    callSQL(sql, function(err,data){
                        if (err)
                            console.log("ERROR : ",err)
                        else{
                            let listeOnline = false
                            for(let perso of data){
                                if(listeOnline)
                                    listeOnline += ', '+perso.pseudo
                                else
                                    listeOnline = perso.pseudo
                            }
                            if(!listeOnline)
                                socket.emit('chat_messageBrute', "Aucun utilisateur n'est en ligne !")
                            else
                                socket.emit('chat_messageBrute', "Utilisateur en ligne : "+listeOnline)
                        }
                    })
                    break
                case '/withMe':
                    sql = "SELECT * FROM `users` where connected = 1 and channelConnected = (select id from salons where nom='"+socket.salon+"') order by pseudo ASC"
                    callSQL(sql, function(err,data){
                        if (err)
                            console.log("ERROR : ",err)
                        else{
                            let listeOnlineRoom = false
                            for(let persoRoom of data){
                                if(listeOnlineRoom)
                                    listeOnlineRoom += ', '+persoRoom.pseudo
                                else
                                    listeOnlineRoom = persoRoom.pseudo
                            }
                            if(!listeOnlineRoom)
                                socket.emit('chat_messageBrute', "Aucun utilisateur n'est en ligne dans votre salon!")
                            else
                                socket.emit('chat_messageBrute', "Utilisateur en ligne dans "+socket.salon+": "+listeOnlineRoom)
                        }
                    })
                    break
                case '/help':
                    let arrayHelp = {
                        '/quit' : 'Commande qui permet de se deconnecter',
                        '/r' : 'methode qui permet de repondre au dernier message privé'
                    }
                    let listeHelp = 'Listes des commandes disponibles :<br><br>'
                    for(let elmHelp in arrayHelp){
                        listeHelp += '&emsp;&emsp;'+elmHelp+' - '+arrayHelp[elmHelp]+'<br>'
                    }
                    socket.emit('chat_help', listeHelp)
                    break

                default: 
                    sql = "INSERT INTO messages (message, emetteur, salon) VALUES ('"+ ent.encode(addslashes(msg.trim())) +"', (select id from users where pseudo='"+socket.pseudo+"'),(select id from salons where nom='"+socket.salon+"'))"
                    callSQL(sql, function(err,data){
                        if (err)
                            console.log("ERROR : ",err)
                    })
                    
                    socket.emit('chat_message', {pseudo: socket.pseudo, message: msg})
                    socket.to(socket.salon).broadcast.emit('chat_message', {pseudo: socket.pseudo, message: msg})    
                    break
            }
        
        }
    })
})

http.listen(3000, () => console.log('LINK START 3000!'))

function callSQL(request, callback){
    connection.query(request, function (error, results, fields) {
        if (error) 
            callback(error,null)
        else
            callback(null,results)
    })
}

function checkSalons(socket, salon, old = null){
    let retour
    if(salons.indexOf(salon.toLowerCase()) > 0){
        retour = salon.toLowerCase()
    }
    else{
        socket.emit('chat_messageBrute', "Le salon "+salon+" n'existe pas...")
        if(old != null)
            retour = old
        else
            retour = salons[0]
    }

    sql = "UPDATE `users` SET `connected` = '1',`channelConnected` = (select id from salons where nom='"+retour+"')  WHERE `users`.`pseudo` = '"+socket.pseudo+"'"
    callSQL(sql, function(err,data){
        if (err)
            console.log("ERROR : ",err)
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
        replace(/"/g, '\\"')
}