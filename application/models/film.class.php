<?php 

include_once('dbtools.php');
include_once('genre.class.php');
include_once('distributeur.class.php');

Class Film extends Hedgehog {
    public function __construct(){

        $this->pk = 'id_film';
        $this->table_name = 'films';
        $this->fields = [ 'id_genre',
            'id_film',
            'id_distributeur',
            'titre',
            'resum',
            'date_debut_affiche',
            'date_fin_affiche',
            'duree_minutes',
            'annee_production',
            'genre',
            'distributeur'
        ];

        $this->genre = new Genre();
        $this->distributeur = new Distributeur();
    }

    public function hydrate(){
        parent::hydrate();
        $this->genre->id_genre = $this->id_genre;
        $this->genre->hydrate();
        $this->distributeur->id_distributeur = $this->id_distributeur;
        $this->distributeur->hydrate();
    }

    public function save(){
        parent::save();
        $this->genre->save();
        $this->distributeur->save();
    }
}