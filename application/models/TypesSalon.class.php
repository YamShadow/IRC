<?php 

require_once('application/models/DataObject.class.php');


Class TypesSalon extends DataObject {
    protected $className = 'TypesSalon';
    protected $tableName = 'types_salon';
    protected $primaryKey = 'id';
    protected $innerFields = [ 
        'id',
        'nom',
    ];

    protected $id;
    protected $nom;
}