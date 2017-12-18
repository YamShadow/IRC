<?php 

require_once('application/models/DataObject.class.php');


Class Roles extends DataObject {
    protected $className = 'Roles';
    protected $tableName = 'roles';
    protected $primaryKey = 'id';
    protected $innerFields = [ 
        'id',
        'nom',
    ];
    protected $foreignFields = [
        'salon' => 'Salons'
    ];

    protected $id;
    protected $nom;
    protected $salon;
}