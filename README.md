# IRC
IRC for ECV Digital. Student Project.

--------

## Où en était-on ? 

### Mardi 12
* Mathieu : créé le controller Auth. Les view sont crées pour login, register.
* Florian : Socket.io on a récup le point du cours avec une doc. Vue.js et pseudo en cours de regard.
* Jordan : A commencé rédaction de la BDD. 

### Mercredi 13
* Mathieu : 
    * Création des vues login/inscription (html/css). 
    * Création du modèle users (inscription/checkpseudodispo/getUser). 
    * Création ChatController+views lié. 
    * Redirection effecté en cas de connexion.

### Jeudi 14
On s'est fixé de partir sans serveur pour commencer. 
* Jordan : Fini la BDD et sorti un schéma de celle-ci.
* Jordan : Avancée dans ORM. Le côté foreign key est clair, sauf pour les tables de liaisons.
* Mathieu :
    * Liaison PHP / Node

### Vendredi 15
* Jordan : Concernant l'ORM, on oublie les Foreign Keys en Many-to-Many. A la place on part sur une écriture des méthodes compliquées à la mano pour chaque entité. 
* Mathieu : 
    * Création de Node.js avec Socket.io
    * refonte du code du chat
    * Ajout des pseudo
    * Ajout du multichannel
    * ajout commande /quit
    * patch CSS

### Samedi 16
* Jordan : Fini l'ORM. Testé. Reste à voir comment il se comportera avec les FK quand elles arriveront.
* Mathieu : 
    * Ajout /switch pour changer de channel
    * Rejet en cas de pseudo inconnu
    * Recuperation des salons existant
    * Suppression du token en cas de deconnexion
    * Ajout du token de connexion
    * Sauvegarde des messages en BDD
    * Reload des 10 derniers messages dans le salon 
    * Ajout d'un son en cas de messages
    * Ajout des MP
    * Début du style css du chat

### Lundi 18
* Jordan : Les FK fonctionnent par l'ORM. Entités de base. Réécrit le connect en utilisant des fonctions de Users.

--------------

## TODO

### Jordan
- [x] Faire ORM
- [x] Finir BDD
- [x] Sortir le schéma de la base
- [ ] Créer les scripts répondant aux requêtes AJAX faites par le client.

### Mathieu
- [x] Partie métier de login et register
- [ ] <del>Maquettes</del>
- [ ] Implémenter les erreurs dans les views Logins/Register
- [x] Switch de channel
- [x] Rejet en cas de pseudo inconnu
- [x] Recuperation des salons existant
- [x] Suppression du token en cas de deconnexion
- [x] Ajout du token de connexion
- [x] Sauvegarde des messages en BDD
- [x] Reload des 10 derniers messages dans le salon
- [x] Add d'un son en cas de messages
- [x] Add des MP( /msg )
- [x] /r = reponse a la derniere personne MP 
- [x] /friendlist = liste les amis
- [x] /invite [PSEUDO] invite la personne en ami
- [x] /acceptFriend [Pseudo] = Accepte l'ami
- [x] /declineFriend [Pseudo] = refuse
- [x] /online = Affiche tous les gens en ligne sur le chat
- [x] /roomList = liste toute les rooms
- [x] /createRoom = crée un salon
- [ ] /deleteRoom = delete un salon
- [x] /kick [PSEUDO] = kick une personne 
- [x] /withMe = liste les gens en ligne dans cette room
- [x] /help = liste les commandes
- [ ] target des users @
- [ ] Logo


### Florian
- [ ] Implémenter Vue.js
- [ ] Page du chat, avec CSS modulaire
- [ ] "Pop up" ajout d'ami / acceptation d'ami
- [ ] "Pop up" de message privé
- [ ] HomePage
- [ ] Responsive + boutons mobiles
- [ ] Accessibilité
- [ ] MarkDown

### Bonus :

- [ ] .htaccess
- [ ] sons
- [ ] Autocomplétion des commandes
- [ ] Clique pseudo user => @Pseudo dans l'input text 

