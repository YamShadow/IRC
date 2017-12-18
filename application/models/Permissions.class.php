<?php 

require_once('application/models/DataObject.class.php');


Class Permissions extends DataObject {
    protected $className = 'Permissions';
    protected $tableName = 'permissions';
    protected $primaryKey = 'id';
    protected $innerFields = [ 
        'id',
        'nom',
    ];

    protected $id;
    protected $nom;
}