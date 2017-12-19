<?php 
require_once('application/models/DataObject.class.php');
require_once('application/models/Salons.class.php');

Class Users extends DataObject {
    protected $className = 'Users';
    protected $tableName = 'users';
    protected $primaryKey = 'id';
    protected $innerFields = [ 
        'id',
        'pseudo',
        'image',
        'password',
        'mail',
        'connected',
    ];
    protected $foreignFields = [
        'channelConnected' => 'Salons'
    ];

    protected $id;
    protected $pseudo;
    protected $image;
    protected $password;
    protected $mail;
    protected $connected = 0;
    protected $channelConnected = null;

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'pseudo' => $this->pseudo,
            'image' => $this->image,
            'connected' => $this->connected,
            'mail' => $this->mail
        ];
    }

    public function isConnected() {
        if (!in_array($connected, [0, 1], true)) seterr('Erreur de type pour $connected.', 'Users');
        if ($connected) return true;
        return false;
    }

    
    public function setUserSession(){
        $_SESSION['user_id'] = $this->id;
        $_SESSION['user_pseudo'] = $this->pseudo;
        $_SESSION['user_image'] = $this->image;
        $_SESSION['user_mail'] = $this->mail;
        $_SESSION['user_connected'] = 1;
        $this->connected = 1;
        $this->save();
    }

    public function getFriends() {
        $req = 
        'SELECT DISTINCT users.pseudo, users.connected, users.image, amis.etat
        FROM users 
            INNER JOIN amis ON users.id = amis.personne_a OR users.id = amis.personne_b
        WHERE 
            (amis.personne_a = 
                (SELECT id FROM users WHERE pseudo=\''.$this->pseudo.'\') 
            OR amis.personne_b = 
                (select id from users where pseudo=\''.$this->pseudo.'\')) 
            AND users.id != 
                (select id from users where pseudo=\''.$this->pseudo.'\') 
        ORDER BY pseudo ASC';

        return dbFetchAllAssoc($req);
    }

    public function addFriend($id_personne, $id_etat) {
        $req = 'ISNERT INTO amis (personne_a, personne_b, etat) VALUE ('.$this->id.', '.$id_personne.', '.$id_etat.')';

        return dbQuery($req);
    }
}