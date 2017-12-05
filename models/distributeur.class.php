<?php 

include_once('dbtools.php');
include_once('hedgehog.class.php');

Class Distributeur extends Hedgehog {

    public function __construct(){

        $this->pk = 'id_distributeur';
        $this->table_name = 'distributeurs';
        $this->fields = [ 'id_distributeur',
            'nom',
            'telephone',
            'adresse',
            'cpostal',
            'ville',
            'pays',
        ];
    }
}