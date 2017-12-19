<?php 

require_once('application/models/DataObject.class.php');
require_once('application/models/TypesSalon.class.php');


Class Salons extends DataObject {
    protected $className = 'Salons';
    protected $tableName = 'salons';
    protected $primaryKey = 'id';
    protected $innerFields = [ 
        'id',
        'nom',
    ];
    protected $foreignFields = [
        'type_salon' => 'TypesSalon'
    ];

    protected $id;
    protected $nom;
    protected $type_salon;
}