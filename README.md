# IRC
IRC for ECV Digital. Student Project.

--------

## Où en était-on ? 

### Mardi 12
* Mathieu : créé le controller Auth. Les view sont crées pour login, register.
* Florian : Socket.io on a récup le point du cours avec une doc. Vue.js et pseudo en cours de regard.
* Jordan : A commencé rédaction de la BDD. 

### Mercredi 13
* Mathieu : Création des vues login/inscription (html/css). Création du modèle users (inscription/checkpseudodispo/getUser). Création ChatController+views lié. Redirection effecté en cas de connexion.

### Jeudi 14
On s'est fixé de partir sans serveur pour commencer. 
* Jordan : Fini la BDD et sorti un schéma de celle-ci.
* Jordan : Avancée dans ORM. Le côté foreign key est clair, sauf pour les tables de liaisons.

### Vendredi 15
Concernant l'ORM, on oublie les Foreign Keys en Many-to-Many. A la place on part sur une écriture des méthodes compliquées à la mano pour chaque entité. 

--------------

## TODO

### Jordan
- [ ] Faire ORM
- [x] Finir BDD
- [x] Sortir le schéma de la base

### Mathieu
- [x] Partie métier de login et register
- [ ] <del>Maquettes</del>
- [ ] Implémenter les erreurs dans les views Logins/Register
- [ ] Commencer les get des data pour Florian
- [ ] .htaccess

### Florian
- [ ] Implémenter Vue.js
- [ ] Page du chat, avec CSS modulaire
