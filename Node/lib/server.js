'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//equivalent du htmlspécialchars
var ent = require('ent');
var mysql = require('mysql');
var app = (0, _express2.default)();
var http = _http2.default.Server(app);
var io = (0, _socket2.default)(http);

var PUBLIC_PATH = _path2.default.join(_path2.default.dirname(__dirname), 'public');
var CHAT_PATH = _path2.default.join(PUBLIC_PATH, 'chat.html');
var users = {};

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chatbot"
});
connection.connect();

//Initialise la route / en get
app.get('/', function (req, res) {
    res.sendFile(CHAT_PATH);
});

var salons = [];

//permet de recuperer tous les salons existants
var sql = "select * from salons";
callSQL(sql, function (err, data) {
    if (err) {
        console.log("ERROR : ", err);
    } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var d = _step.value;

                salons.push(d.nom.toLowerCase());
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
});

io.sockets.on('connection', function (socket) {

    //Route de connexion. Recuperer le pseudo/salon par un Get URL
    socket.on('new_user', function (pseudo, salon) {
        pseudo = ent.encode(pseudo);
        salon = ent.encode(salon);

        //Check si l'utilisateur est connu en base
        sql = "select * from users where pseudo='" + pseudo + "'";
        callSQL(sql, function (err, data) {
            if (err) console.log("ERROR : ", err);else {
                if (data.length < 1) socket.emit('quit_user', 'close');
            }
        });
        socket.pseudo = pseudo;
        users[socket.pseudo] = socket;

        //verifie si le salon est connu
        socket.salon = checkSalons(socket, salon);

        socket.join(socket.salon);

        //recuperer les 10 derniers messages
        sql = "select users.pseudo, messages.message from messages join users on messages.emetteur = users.id where salon = (select id from salons where nom='" + socket.salon + "') order by date_message DESC limit 10";
        callSQL(sql, function (err, data) {
            if (err) console.log("ERROR : ", err);else {
                data.reverse();
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var m = _step2.value;

                        socket.emit('chat_message', { pseudo: m.pseudo, message: ent.decode(m.message) });
                    }
                    //affiche un message de bienvenue dans le client du socket
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                socket.emit('new_user', { pseudo: socket.pseudo, salon: socket.salon });
            }
        });

        //affiche un message chez les autres clients du même channel
        socket.broadcast.to(socket.salon).emit('new_user', { pseudo: socket.pseudo, salon: socket.salon });
    });

    //Route de deconnexion
    socket.on('disconnect', function () {
        sql = "UPDATE `users` SET `connected` = '' WHERE `users`.`pseudo` = '" + socket.pseudo + "'";
        callSQL(sql, function (err, data) {
            if (err) console.log("ERROR : ", err);
        });

        socket.leave(socket.salon);
        //affiche un message chez les autres clients du même channel
        socket.to(socket.salon).broadcast.emit('goodbye_user', socket.pseudo);
    });

    //Route d'echange des messages
    socket.on('chat_message', function (msg) {
        if (msg != '') {
            switch (msg.split(' ', 1)[0]) {
                case '/quit':
                    socket.emit('quit_user', 'close');
                    delete users[socket.pseudo];
                    break;
                case '/switch':
                    var newChannel = msg.split(" ")[1];

                    var oldChannel = socket.salon;
                    socket.leave(socket.salon);
                    socket.salon = checkSalons(socket, newChannel, oldChannel);

                    if (socket.salon != oldChannel) {
                        socket.join(socket.salon);
                        //Emet un message dans le tchat du client
                        socket.emit('chat_messageBrute', 'Vous êtes connecter sur le channel ' + socket.salon);
                        //Emet un message dans l'ancien salon 
                        socket.broadcast.to(oldChannel).emit('chat_messageBrute', socket.pseudo + ' a quitter le salon');
                        //Emet un message dans le nouveau salon
                        socket.broadcast.to(socket.salon).emit('chat_messageBrute', socket.pseudo + ' a rejoint votre salon');
                    }
                    break;
                case '/kick':
                    var splitKick = msg.split(" ");
                    var pseudoKick = splitKick[1];
                    users[pseudoKick].emit('quit_user', 'close');
                    delete users[pseudoKick];
                    break;
                case '/msg':
                    var split = msg.split(" ");
                    var pseudoMsg = split[1];
                    var message = '';
                    for (var i = 2; i < split.length; i++) {
                        message += ' ' + split[i];
                    }

                    sql = "select * from users where pseudo='" + pseudoMsg + "'";
                    callSQL(sql, function (err, data) {
                        if (err) console.log("ERROR : ", err);else {
                            if (data.length > 0) {
                                sql = "INSERT INTO messages_prives (message, emetteur, destinataire) VALUES ('" + ent.encode(addslashes(message.trim())) + "', (select id from users where pseudo='" + socket.pseudo + "')," + data[0].id + ")";
                                callSQL(sql, function (err, data) {
                                    if (err) console.log("ERROR : ", err);
                                });
                                if (data[0].connected != '') {
                                    socket.emit('chat_messagePrivate', socket.pseudo + " (vous avez chuchoté): " + message);
                                    users[pseudoMsg].emit('chat_messagePrivate', socket.pseudo + " (murmure): " + message);
                                    users[pseudoMsg].lastMsgPseudo = socket.pseudo;
                                }
                            } else {
                                socket.emit('chat_messageBrute', "Le pseudo " + pseudoMsg + " ne correspond à aucun utilisateur...");
                            }
                        }
                    });
                    break;
                case '/r':
                    console.log(socket.lastMsgPseudo);
                    var splitReponse = msg.split(" ");
                    var messageReponse = '';
                    for (var _i = 1; _i < splitReponse.length; _i++) {
                        messageReponse += ' ' + splitReponse[_i];
                    }

                    sql = "select * from users where pseudo='" + socket.lastMsgPseudo + "'";
                    callSQL(sql, function (err, data) {
                        if (err) console.log("ERROR : ", err);else {
                            if (data.length > 0) {
                                sql = "INSERT INTO messages_prives (message, emetteur, destinataire) VALUES ('" + ent.encode(addslashes(messageReponse.trim())) + "', (select id from users where pseudo='" + socket.pseudo + "')," + data[0].id + ")";
                                callSQL(sql, function (err, data) {
                                    if (err) console.log("ERROR : ", err);
                                });
                                if (data[0].connected != '') {
                                    socket.emit('chat_messagePrivate', socket.pseudo + " (vous avez chuchoté): " + messageReponse);
                                    users[socket.lastMsgPseudo].emit('chat_messagePrivate', socket.pseudo + " (murmure): " + messageReponse);
                                    users[socket.lastMsgPseudo].lastMsgPseudo = socket.pseudo;
                                    delete socket.lastMsgPseudo;
                                }
                            } else {
                                socket.emit('chat_messageBrute', "Le pseudo " + pseudoMsg + " ne correspond à aucun utilisateur...");
                            }
                        }
                    });

                    break;
                case '/invite':
                    var splitInvite = msg.split(" ");
                    var pseudoInvite = splitInvite[1];

                    if (socket.pseudo != pseudoInvite) {
                        sql = "select * from users where pseudo='" + pseudoInvite + "'";
                        callSQL(sql, function (err, data) {
                            if (err) console.log("ERROR : ", err);else {
                                if (data.length > 0) {
                                    sql = "SELECT etat FROM `amis` WHERE (`personne_a` = (select id from users where pseudo='" + socket.pseudo + "') and `personne_b` = (select id from users where pseudo='" + pseudoInvite + "')) || (`personne_a` = (select id from users where pseudo='" + pseudoInvite + "') and `personne_b` = (select id from users where pseudo='" + socket.pseudo + "'))";
                                    callSQL(sql, function (err, data) {
                                        if (err) console.log("ERROR : ", err);
                                        if (data.length <= 0) {
                                            sql = "INSERT INTO `amis` (`id`, `personne_a`, `personne_b`, `etat`) VALUES (NULL, (select id from users where pseudo='" + socket.pseudo + "'), (select id from users where pseudo='" + pseudoInvite + "'), '1')";
                                            callSQL(sql, function (err, data) {
                                                if (err) console.log("ERROR : ", err);else {
                                                    socket.emit('chat_messageBrute', "Une demande d'ami a été envoyée a " + pseudoInvite);
                                                    users[pseudoInvite].emit('chat_messageBrute', socket.pseudo + " souhaite devenir votre ami !");
                                                }
                                            });
                                        } else {
                                            switch (data[0].etat) {
                                                case 1:
                                                    socket.emit('chat_messageBrute', "Une invitation est déjà en cours avec " + pseudoInvite);
                                                    break;
                                                case 2:
                                                    socket.emit('chat_messageBrute', "Vous êtes déjà ami avec " + pseudoInvite + " !");
                                                    break;
                                                case 2:
                                                    socket.emit('chat_messageBrute', pseudoInvite + " refuse d'être votre ami ! Prenez un Curly !");
                                                    break;
                                                default:
                                                    socket.emit('chat_messageBrute', "Bug de la matrice !");
                                                    break;
                                            }
                                        }
                                    });
                                } else {
                                    socket.emit('chat_messageBrute', "Le pseudo " + pseudoInvite + " ne correspond à aucun utilisateur...");
                                }
                            }
                        });
                    }
                    break;
                case '/friendlist':
                    sql = "SELECT DISTINCT users.pseudo FROM users join amis on users.id = amis.personne_a or users.id = amis.personne_b where (amis.personne_a = (select id from users where pseudo='" + socket.pseudo + "') or amis.personne_b = (select id from users where pseudo='" + socket.pseudo + "')) and users.id != (select id from users where pseudo='" + socket.pseudo + "') and amis.etat = 2 order by pseudo ASC";
                    callSQL(sql, function (err, data) {
                        if (err) console.log("ERROR : ", err);else {
                            var listeAmi = false;
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var ami = _step3.value;

                                    if (listeAmi) listeAmi += ', ' + ami.pseudo;else listeAmi = ami.pseudo;
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                        _iterator3.return();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }

                            if (!listeAmi) socket.emit('chat_messageBrute', "Vous n'avez aucun amis... ");else socket.emit('chat_messageBrute', "Vos amis sont : " + listeAmi);
                        }
                    });
                    break;
                case '/acceptFriend':
                    var splitAccepte = msg.split(" ");
                    var pseudoAccepte = splitAccepte[1];
                    sql = "UPDATE `amis` SET `etat` = '5' WHERE `amis`.`personne_a` = (select id from users where pseudo='" + pseudoAccepte + "') and `amis`.`personne_b` = (select id from users where pseudo='" + socket.pseudo + "')";
                    callSQL(sql, function (err, data) {
                        if (err) console.log("ERROR : ", err);else {
                            if (data.affectedRows > 0) {
                                socket.emit('chat_messageBrute', pseudoAccepte + " est maintenant votre ami !");
                                users[pseudoAccepte].emit('chat_messageBrute', socket.pseudo + " a accepté votre demande !");
                            }
                        }
                    });
                    break;
                case '/declineFriend':
                    var splitRefuse = msg.split(" ");
                    var pseudoRefuse = splitRefuse[1];
                    sql = "UPDATE `amis` SET `etat` = '2' WHERE `amis`.`personne_a` = (select id from users where pseudo='" + pseudoRefuse + "') and `amis`.`personne_b` = (select id from users where pseudo='" + socket.pseudo + "')";
                    callSQL(sql, function (err, data) {
                        if (err) console.log("ERROR : ", err);else {
                            if (data.affectedRows > 0) {
                                socket.emit('chat_messageBrute', "La demande de " + pseudoRefuse + " a été réfusé !");
                                users[pseudoRefuse].emit('chat_messageBrute', socket.pseudo + " a refusé votre demande !");
                            }
                        }
                    });
                    break;
                case '/roomList':
                    sql = "SELECT * FROM `salons` order by nom ASC";
                    callSQL(sql, function (err, data) {
                        if (err) console.log("ERROR : ", err);else {
                            var listeRoom = false;
                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;

                            try {
                                for (var _iterator4 = data[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    var room = _step4.value;

                                    if (listeRoom) listeRoom += ', ' + room.nom;else listeRoom = room.nom;
                                }
                            } catch (err) {
                                _didIteratorError4 = true;
                                _iteratorError4 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                        _iterator4.return();
                                    }
                                } finally {
                                    if (_didIteratorError4) {
                                        throw _iteratorError4;
                                    }
                                }
                            }

                            socket.emit('chat_messageBrute', "Les salons sont : " + listeRoom);
                        }
                    });
                    break;
                case '/createRoom':
                    var splitCreateRoom = msg.split(" ");
                    var nameCreateRoom = splitCreateRoom[1];
                    if (nameCreateRoom != undefined) {
                        sql = "INSERT INTO `salons` (`nom`, `type_salon`) VALUES ('" + nameCreateRoom + "', '1')";
                        callSQL(sql, function (err, data) {
                            if (err) console.log("ERROR : ", err);else {
                                console.log(data);
                                if (data.affectedRows > 0) {
                                    socket.emit('chat_messageBrute', "Le salon " + nameCreateRoom + " a été crée !");
                                    salons.push(nameCreateRoom);
                                }
                                console.log(salons);
                            }
                        });
                    } else socket.emit('chat_messageBrute', "Veuillez saisir un nom de salon valide !");
                    break;
                case '/online':
                    sql = "SELECT * FROM `users` where connected = 1 order by pseudo ASC";
                    callSQL(sql, function (err, data) {
                        if (err) console.log("ERROR : ", err);else {
                            var listeOnline = false;
                            var _iteratorNormalCompletion5 = true;
                            var _didIteratorError5 = false;
                            var _iteratorError5 = undefined;

                            try {
                                for (var _iterator5 = data[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                    var perso = _step5.value;

                                    if (listeOnline) listeOnline += ', ' + perso.pseudo;else listeOnline = perso.pseudo;
                                }
                            } catch (err) {
                                _didIteratorError5 = true;
                                _iteratorError5 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                        _iterator5.return();
                                    }
                                } finally {
                                    if (_didIteratorError5) {
                                        throw _iteratorError5;
                                    }
                                }
                            }

                            if (!listeOnline) socket.emit('chat_messageBrute', "Aucun utilisateur n'est en ligne !");else socket.emit('chat_messageBrute', "Utilisateur en ligne : " + listeOnline);
                        }
                    });
                    break;
                case '/withMe':
                    sql = "SELECT * FROM `users` where connected = 1 and channelConnected = (select id from salons where nom='" + socket.salon + "') order by pseudo ASC";
                    callSQL(sql, function (err, data) {
                        if (err) console.log("ERROR : ", err);else {
                            var listeOnlineRoom = false;
                            var _iteratorNormalCompletion6 = true;
                            var _didIteratorError6 = false;
                            var _iteratorError6 = undefined;

                            try {
                                for (var _iterator6 = data[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                    var persoRoom = _step6.value;

                                    if (listeOnlineRoom) listeOnlineRoom += ', ' + persoRoom.pseudo;else listeOnlineRoom = persoRoom.pseudo;
                                }
                            } catch (err) {
                                _didIteratorError6 = true;
                                _iteratorError6 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                        _iterator6.return();
                                    }
                                } finally {
                                    if (_didIteratorError6) {
                                        throw _iteratorError6;
                                    }
                                }
                            }

                            if (!listeOnlineRoom) socket.emit('chat_messageBrute', "Aucun utilisateur n'est en ligne dans votre salon!");else socket.emit('chat_messageBrute', "Utilisateur en ligne dans " + socket.salon + ": " + listeOnlineRoom);
                        }
                    });
                    break;

                case '/help':
                    array = [];
                    break;

                default:
                    sql = "INSERT INTO messages (message, emetteur, salon) VALUES ('" + ent.encode(addslashes(msg.trim())) + "', (select id from users where pseudo='" + socket.pseudo + "'),(select id from salons where nom='" + socket.salon + "'))";
                    callSQL(sql, function (err, data) {
                        if (err) console.log("ERROR : ", err);
                    });

                    socket.emit('chat_message', { pseudo: socket.pseudo, message: msg });
                    socket.to(socket.salon).broadcast.emit('chat_message', { pseudo: socket.pseudo, message: msg });
                    break;
            }
        }
    });
});

http.listen(3000, function () {
    return console.log('LINK START 3000!');
});

function callSQL(request, callback) {
    connection.query(request, function (error, results, fields) {
        if (error) callback(error, null);else callback(null, results);
    });
}

function checkSalons(socket, salon) {
    var old = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var retour = void 0;
    if (salons.indexOf(salon.toLowerCase()) > 0) {
        retour = salon.toLowerCase();
    } else {
        socket.emit('chat_messageBrute', "Le salon " + salon + " n'existe pas...");
        if (old != null) retour = old;else retour = salons[0];
    }

    sql = "UPDATE `users` SET `connected` = '1',`channelConnected` = (select id from salons where nom='" + retour + "')  WHERE `users`.`pseudo` = '" + socket.pseudo + "'";
    callSQL(sql, function (err, data) {
        if (err) console.log("ERROR : ", err);
    });

    return retour;
}

function addslashes(string) {
    return string.replace(/\\/g, '\\\\').replace(/\u0008/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/'/g, '\\\'').replace(/"/g, '\\"');
}