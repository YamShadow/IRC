<?php 
require_once('application/models/DataObject.class.php');

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

    protected $id;
    protected $pseudo;
    protected $image;
    protected $password;
    protected $mail;
    protected $connected = 0;

    
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
}