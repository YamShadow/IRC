<?php 

include_once('dbtools.php');
include_once('/system/function_core.php');

Class DataObject {

	/* POSTULAT DE BASE : 
		* La clef primaire est numérique (INT UNSIGNED NOT NULL AUTO_INCREMENT)

	*/

	protected $table_name = null;
	protected $primaryKey = null;
	protected $innerFields = [];        // Contient la liste des champs qui sont propres à la table
	protected $foreignFields = [];      // Contient la liste des champs qui sont des clefs étrangères OtO
	protected $foreignManyFields = [];  // Contient la liste des champs qui sont des clefs étrangères MtM
	protected $isNewOne = true;			// Indique s'il s'agit d'une nouvelle entité (défini pendant __construct). Utile pour set en base.

	public function __construct($id = null) {
		if ($id != null) {
			// Si on fournit un id, c'est qu'on veut récupérer l'instance qui est en base avec cet id
			if (is_numeric($id)) {
				$this->primaryKey = $id;
				$this->hydrate();
				$this->isNewOne = false;
			} else {
				logs('ERREUR : Une clef primaire non numérique a été fournie en construction d\'une entité.', 'DataObject.class.php');
				die('Une clef primaire non numérique a été fournie');
			}
		}
	}

	public function instantiate() {
		// La seule fonction que l'utilisateur aura a réécrire

		// Instanciation des variables
	}

	public function hydrate(){

		if($this->{$this->primaryKey} == null){
			die('Fatal error: pas de primary key.');
		}

		$query = 'SELECT * FROM '.$this->table_name.' where '.$this->primaryKey.'='.$this->{$this->primaryKey};
		$result = dbFetchAssoc($query);
		if(empty($result))
			return false;
		
		foreach($result as $keyElm => $valueElm){
			if($keyElm != $this->primaryKey){
				$this->$keyElm = $valueElm;
			}
		}
	}

	public function hydrateWith() {

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
		$query = 'SELECT * FROM '.$this->table_name.' where '.$this->primaryKey.'='.$this->{$this->primaryKey};
		$stringName = '';
		$stringValue = '';
		$result = dbFetchAssoc($query);
		if(empty($result)){
			echo 'insert';
			$flag = true;
			foreach($this->fields as $valueChamps){
				if($valueChamps != $this->primaryKey){
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
			$result = dbQuery($query);

			if(!$result)
				die('Erreur durant l\'insert du genre');
			return lastId($result);

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
				if($valueChamps != $this->primaryKey){
					if(gettype($this->$valueChamps) == 'object'){
						$value = $this->{$this->$valueChamps->primaryKey};
					}else
						$value = $this->$valueChamps;
					$query .= ' `'.$valueChamps.'` = "'.utf8_decode($value).'"';
				}
			}
			$query .= ' where '.$this->primaryKey.'='.$this->{$this->primaryKey};
			var_dump($query);
			die();
			$result = dbQuery($query);
			if(!$result)
				die('Erreur durant la maj du genre');
			return true;
		}
	}

	public function __autoload($class_name){
		include 'models/'.$class_name.'.class.php';
	}

}