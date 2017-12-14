<?php 

include_once('dbtools.php');
use models\DataObject;

Class Users extends DataObject {
    protected $tableName = 'users';
    protected $primaryKey = 'id';
    protected $fields = [ 
        'id',
        'name',
        'image',
        'password',
        'mail',
        'connected',
    ];

    protected $id;
    protected $name;
    protected $image;
    protected $password;
    protected $mail;
    protected $connected = 0;       // To set a default value

    /* Exemple si on doit tricher pour les FK :
    protected $champFK = new classDuFK();
    auquel cas il y aura direct un objet vide avec la bonne class et on aura juste à l'hydrate
    */
}