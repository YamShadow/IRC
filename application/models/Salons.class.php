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

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'type_salon' => $this->type_salon->id,
        ];
    }

    public function getUsers() {
        $req = 'SELECT * FROM users WHERE channelConnected = '.$this->{$this->primaryKey}.' AND connected = 1';

        $result = dbFetchAllAssoc($req);

        if ($result)
            return $result;
        else 
            return false;
    }
}