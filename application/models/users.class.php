<?php 

include_once('dbtools.php');

Class Users extends DataObject {
    public function __construct(){

        $this->pk = 'id';
        $this->table_name = 'users';
        $this->fields = [ 'id',
            'name',
            'image',
            'password',
            'mail',
            'connected',
        ];
    }
}