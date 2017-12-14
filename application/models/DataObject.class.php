<?php 
namespace models;

include_once('dbtools.php');
include_once('system/functionCore.php');

Class DataObject {

	/* POSTULAT DE BASE : 
		* La clef primaire est numérique (INT UNSIGNED NOT NULL AUTO_INCREMENT)

	*/

	protected $tableName = null;
	protected $primaryKey = null;
	protected $innerFields = [];        // Contient la liste des champs qui sont propres à la table
	protected $foreignFields = [];      // Contient la liste des champs qui sont des clefs étrangères OtO
	protected $foreignManyFields = [];  // Contient la liste des champs qui sont des clefs étrangères MtM
	protected $isNewOne = true;			// Indique s'il s'agit d'une nouvelle entité (défini pendant __construct). Utile pour set en base.

	public function __construct($id = null) {
		$this->setAttributes();
		if ($id != null) {
			// Si on fournit un id, c'est qu'on veut récupérer l'instance qui est en base avec cet id
			if (is_numeric($id)) {
				$this->{$this->primaryKey} = $id;
				$this->hydrate();
				$this->isNewOne = false;
			} else 
				seterr('ERREUR : Une clef primaire non numérique a été fournie en construction d\'une entité.', 'DataObject.class.php');
		}
	}

	/* public function setAttributes() {
		// La seule fonction que l'utilisateur aura a réécrire

		// Instanciation des variables
	} */

	public function hydrate() {			// Ne prend pour l'instant pas en compte les FK MtM
		if ($this->isNewOne) 
			seterr('Fatal error: tentavive d\'hydrate une entité qui n\'existe pas encore en base', 'DataObject.hydrate');

		if ($this->{$this->primaryKey} == null) 
			seterr('Fatal error: pas de primary key.', 'DataObject.hydrate');

		$query = 'SELECT * FROM '.$this->tableName.' WHERE '.$this->primaryKey.' = '.$this->{$this->primaryKey};

		$result = dbFetchAssoc($query);
		if (empty($result))
			seterr('Fatal error: hydrate n\'a pas pu récupérer de donnée', 'DataObject.hydrate');


		foreach ($this->innerFields as $field) {				// On set tous les champs classiques
			$this->$field = $result[$field];
		}

		foreach ($this->foreignFields as $field => $class) {	// On set toutes les FK, donc on doit créer des objets des class concernées et les hydrate
			$this->$field = new $class($result[$field]);
			/* Si on doit tricher :
				$this->$field = new $class;
				$this->$field->{$this->$field->$primaryKey} = $result[$field];
				$this->$field->hydrate();
			*/
		}
	}

	public function getBy($array) {
		// Nous renvoie l'entité qui correspond à l'array de conditions en entrée ou false si rien trouvé
		// Array en entrée = ['champ' => value, 'champ' => value]
	}

	public function __get($attr_name) {
		if(in_array($attr_name, $this->fields))
			return $this->$attr_name;
		else
			seterr('La variable n\'existe pas', 'DataObject.__get');
	}

	public function __set($attr_name, $attr_value) {
		if(in_array($attr_name, $this->fields))
			$this->$attr_name = $attr_value;
		else
			seterr('La variable n\'existe pas', 'DataObject.__set');
	}

	public function save() {
		$query = 'SELECT * FROM '.$this->tableName.' WHERE '.$this->primaryKey.'='.$this->{$this->primaryKey};
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
			$query = 'INSERT INTO '.$this->tableName.' ('.$stringName.') VALUES ('.$stringValue.')';
			$result = dbQuery($query);

			if(!$result)
				seterr('Erreur durant l\'insert du genre', 'DataObject.save');
			return lastId($result);

		} else {
			$query = 'UPDATE '.$this->tableName.' set';
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
			/* var_dump($query);
			die(); */
			$result = dbQuery($query);
			if(!$result)
				seterr('Erreur durant la maj du genre', 'DataObject.save');
			return true;
		}
	}

	/* public function __autoload($class_name) {
		include 'models/'.$class_name.'.class.php';
	} */

}