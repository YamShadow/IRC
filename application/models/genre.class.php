<?php 

include_once('dbtools.php');
include_once('hedgehog.class.php');

Class Genre extends Hedgehog {
    
    public function __construct(){
        
        $this->pk = 'id_genre';
        $this->table_name = 'genres';
        $this->fields = [ 'id_genre',
            'nom',
        ];
    }


}