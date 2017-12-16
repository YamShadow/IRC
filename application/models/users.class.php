<?php 
require_once('dbtools.php');
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
    protected $connected = 0;       // To set a default value

    
    public function isConnected() {
        if (!in_array($connected, [0, 1], true)) seterr('Erreur de type pour $connected.', 'Users');
        if ($connected) return true;
        return false;
    }
}