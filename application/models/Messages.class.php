<?php 

require_once('application/models/DataObject.class.php');
require_once('application/models/Users.class.php');
require_once('application/models/Salons.class.php');


Class Messages extends DataObject {
    protected $className = 'Messages';
    protected $tableName = 'messages';
    protected $primaryKey = 'id';
    protected $innerFields = [ 
        'id',
        'message',
        'date_message',
    ];
    protected $foreignFields = [
        'emetteur' => 'Users',
        'salon' => 'Salons',
    ];

    protected $id;
    protected $message;
    protected $date_message;
    protected $emetteur;
    protected $salon;
}