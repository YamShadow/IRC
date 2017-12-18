<?php 

require_once('application/models/DataObject.class.php');


Class Etats extends DataObject {
    protected $className = 'Etats';
    protected $tableName = 'etats';
    protected $primaryKey = 'id';
    protected $innerFields = [ 
        'id',
        'nom',
    ];

    protected $id;
    protected $nom;
}