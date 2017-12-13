<?php 

include_once('dbtools.php');

Class Hedgehog {

    protected $pk = null;
    protected $table_name = null;
    protected $fields = [];

    public function hydrate(){

        if($this->{$this->pk} == null){
            die('Fatal error: pas de PK');
        }

        $query = 'SELECT * FROM '.$this->table_name.' where '.$this->pk.'='.$this->{$this->pk};
        $result = myFetchAssoc($query);
        if(empty($result))
            return false;
        
        foreach($result as $keyElm => $valueElm){
            if($keyElm != $this->pk){
                $this->$keyElm = $valueElm;
            }
        }
    }

    public function __get($attr_name){
        if(in_array($attr_name, $this->fields)){
            return $this->$attr_name;
        }
        else{
            die('La variable n\'existe pas');
        }
    }

    public function __set($attr_name, $attr_value){
        if(in_array($attr_name, $this->fields)){
            $this->$attr_name = $attr_value;
        }
        else{
            die('La variable n\'existe pas');
        }
    }

    public function save(){
        $query = 'SELECT * FROM '.$this->table_name.' where '.$this->pk.'='.$this->{$this->pk};
        $stringName = '';
        $stringValue = '';
        $result = myFetchAssoc($query);
        if(empty($result)){
            echo 'insert';
            $flag = true;
            foreach($this->fields as $valueChamps){
                if($valueChamps != $this->pk){
                    if($flag)
                        $flag = false;
                    else{
                        $stringName .= ',';
                        $tringValue .= ',';
                    }
                    $stringName .= '`'.$valueChamps.'`';
                    $stringValue .= '"'.utf8_decode($this->$valueChamps).'"';
                }
            }
            $query = 'INSERT INTO '.$this->table_name.' ('.$stringName.') VALUES ('.$stringValue.')';
            $result = myQuery($query);

            if(!$result)
                die('Erreur durant l\'insert du genre');
            return last_id($result);

        }
        else{
            $query = 'UPDATE '.$this->table_name.' set';
            $flag = true;
            foreach($this->fields as $valueChamps){
                if($flag){
                    $flag = true;
                }else{ 
                    $query .= ','; 
                }
                if($valueChamps != $this->pk){
                    if(gettype($this->$valueChamps) == 'object'){
                        $value = $this->{$this->$valueChamps->pk};
                    }else
                        $value = $this->$valueChamps;
                    $query .= ' `'.$valueChamps.'` = "'.utf8_decode($value).'"';
                }
            }
            $query .= ' where '.$this->pk.'='.$this->{$this->pk};
            var_dump($query);
            die();
            $result = myQuery($query);
            if(!$result)
                die('Erreur durant la maj du genre');
            return true;
        }
    }

    public function __autoload($class_name){
        include 'models/'.$class_name.'class.php';
    }

}