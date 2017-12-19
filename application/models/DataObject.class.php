<?php 
require_once('system/functionCore.php');
require_once('dbtools.php');

Class DataObject implements JsonSerializable {

	/* POSTULAT DE BASE : 
		* La clef primaire est numérique (INT UNSIGNED NOT NULL AUTO_INCREMENT)
		* Les Foreign Key se font sur clefs primaires
	*/

	protected $className = null;
	protected $tableName = null;
	protected $primaryKey = 'id';
	protected $innerFields = [];        // Contient la liste des champs qui sont propres à la table
	protected $foreignFields = [];      // Contient la liste des champs qui sont des clefs étrangères OtO ==> ['field' => 'class']
	protected $isNewOne = true;			// Indique s'il s'agit d'une nouvelle entité (défini pendant __construct). Utile pour set en base.

	public function __construct($id = null) {
		if ($id != null) {
			// Si on fournit un id, c'est qu'on veut récupérer l'instance qui est en base avec cet id
			if (is_numeric($id)) {
				$this->{$this->primaryKey} = $id;
				$this->hydrate();
			} else 
			seterr('ERREUR : Une clef primaire non numérique a été fournie en construction d\'une entité.', 'DataObject.class.php');
		}
	}
	
	public function hydrate() {			// Hydrate l'entité. Si elle possède des FK (autres que MtM), crée les entités associées en les hydratant à leur tour
		if ($this->{$this->primaryKey} == null) 
			seterr('Fatal error: pas de primary key.', 'DataObject.hydrate');

		if (!is_numeric($this->{$this->primaryKey}))
			seterr('Error : Primary Key non numérique.', 'DataObject.hydrate');

		$query = 'SELECT * FROM '.$this->tableName.' WHERE '.$this->primaryKey.' = '.$this->{$this->primaryKey};

		$result = dbFetchAssoc($query);
		if (empty($result))
			seterr('Fatal error: hydrate n\'a pas pu récupérer de donnée', 'DataObject.hydrate');

		$this->isNewOne = false;								// Si on hydrate cela signifie que ce n'est pas une nouvelle entité mais une de la base

		foreach ($this->innerFields as $field) {				// On set tous les champs classiques
			$this->$field = $result[$field];
		}

		foreach ($this->foreignFields as $field => $class) {	// On set toutes les FK, donc on doit créer des objets des class concernées et les hydrate
			$this->$field = new $class($result[$field]);
		}
	}

	public function getBy($conditions = false, $order_by = false, $order = 'ASC') {
		// Nous renvoie l'entité qui correspond à l'array de conditions en entrée ou false si rien trouvé ordonnées par $order_by, qui peut être un soit un array soit false
		// Array en entrée = ['champ' => value, 'champ' => value]

		$req = 'SELECT '.$this->primaryKey.' FROM '.$this->tableName;	// Requête de base

		if (is_array($conditions) || !empty($conditions)) {				// Si y a des conditions on les ajoute
			$req .= ' WHERE ';
			foreach ($conditions as $champ => $value) {
				$req .= '`'.$champ.'` = \''.$value.'\' AND ';
			}
			$req = substr($req, 0, -5);									// On vire le AND de trop
		}

		if (is_array($order_by) || !empty($order_by)) {					// Si y a un ordre spécifié on l'ajoute
			$req .= ' ORDER BY ';
			foreach ($order_by as $champ) {
				$req .= '`'.$champ.'`, ';
			}
			$req = substr($req, 0, -2);									// On vire la , de trop
			if (in_array($order, ['ASC', 'DESC'])) $req .= $order;
		}


		// On va chercher en base les résults, puis on crée un tableau de class et on instancie une entité par result
		$result = dbFetchAllAssoc($req);
		$return = array();


		foreach ($result as $i => $entity) {
			$return[$i] = new $this->className($entity[$this->primaryKey]);
		}

		return $return;
	}

	public function __get($attr_name) {
		if(in_array($attr_name, $this->innerFields) || isset($this->foreignFields[$attr_name]))
			return $this->$attr_name;
		else
			seterr('La variable '.$attr_name.' n\'existe pas dans l\'entité '.$this->className, 'DataObject.__get');
	}

	public function __set($attr_name, $attr_value) {
		if(in_array($attr_name, $this->innerFields) || isset($this->foreignFields[$attr_name]))
			$this->$attr_name = $attr_value;
		else
			seterr('La variable '.$attr_name.' n\'existe pas dans l\'entité '.$this->className, 'DataObject.__set');
	}

	public function save() {		// Sauvegarde l'entité en base
		if ($this->isNewOne) {
			$req = 'INSERT INTO `'.$this->tableName.'` (`';
			$req .= implode('`, `', $this->innerFields).'`, `'.implode('`, `', array_keys($this->foreignFields)).'`) VALUE (';

			foreach ($this->innerFields as $field) {
				switch ($this->$field) {
					case null: $fv = 'NULL'; break;
					case 'false': $fv = 'false'; break;
					case 'true': $fv = 'true'; break;
					default: $fv = '\''.$this->$field.'\'';
				}
				$req .= $fv.', ';
			}

			foreach ($this->foreignFields as $field => $foreignField) {
				if (isset($this->$field)) 
					$fv = $this->$field->$primaryKey;
				else
					$fv = 'NULL';
				$req .= $fv.', ';
			}

			$req = substr($req, 0, -2);
			$req .= ')';

		} else {
			$req = 'UPDATE `'.$this->tableName.'` SET ';

			foreach ($this->innerFields as $field) {
				switch ($this->$field) {
					case null: $fv = 'NULL'; break;
					case 'false': $fv = 'false'; break;
					case 'true': $fv = 'true'; break;
					default: $fv = '\''.$this->$field.'\'';
				}
				$req .= ' `'.$field.'` = '.$fv.', ';
			}

			foreach ($this->foreignFields as $field => $foreignField) {
				if (isset($this->$field)) 
					$fv = $this->$field->{$this->$field->primaryKey};
				else
					$fv = 'NULL';

				$req .= ' `'.$field.'` = '.$fv.', ';
			}

			$req = substr($req, 0, -2);
			$req .= ' WHERE `'.$this->primaryKey.'` = '.$this->{$this->primaryKey};
		}

		// Exécuter la requête et return + log et save l'id
		logs('Requête appelée : <<< '.$req.' >>>', 'DataObject.save');
		if ($result = dbQuery($req)) {
			if ($this->isNewOne) {
				$this->{$this->primaryKey} = dbLastId();
				$this->isNewOne = false;
			}
		} else 
			seterr('Erreur : Requête non exécutée.', 'DataObject.save');
	}

	public function jsonSerialize() {
		$return = array();

		foreach ($this->innerFields as $field) {
			$return[$field] = $this->$field;
		}
		
		foreach ($this->foreignFields as $field => $class) {
			$return[$field] = $this->$field->jsonSerialize();
		}

		logs('ATTENTION : Appel à jsonSerialize non surchargé !', $this->className.'.jsonSerialize');
		return $return;
	}

	/* public function __autoload($class_name) {
		include 'models/'.$class_name.'.class.php';
	} */

}