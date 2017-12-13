<?php

include_once('application/models/dbtools.php');

function getUser(){
    $valide = true;
    if(!isset($_POST['login']) || empty($_POST['login'])){
        $errors['login'] = 'Veuillez saisir un login !';
        $valide = false;
    }

    if(!isset($_POST['mdp']) || empty($_POST['mdp'])){
        $errors['mdp'] = 'Veuillez saisir un mot de passe !';
        $valide = false;
    }

    if($valide){
        $query = 'SELECT * FROM users where pseudo="'.$_POST['login'].'" and password="'.md5($_POST['mdp']).'"';
        $result = myFetchAssoc($query);
        if(empty($result))
            return false;
        else
            return $result;
    }

    return false;
}

function checkDisponibilitePseudo(){
    if(isset($_POST['login']) && !empty($_POST['login'])){ 
        $query = 'SELECT * FROM users where pseudo="'.$_POST['login'].'"';
        $result = myFetchAssoc($query);
        if(empty($result))
            return true;
    }else{
        $errors['login'] = 'Veuillez saisir un login !';
    }
    return false;

}



function setUser(){
    $valide = true;
    if(!isset($_POST['login']) || empty($_POST['login'])){
        $errors['login'] = 'Veuillez saisir un login !';
        $valide = false;
    }

    if(!isset($_POST['mdp']) || empty($_POST['mdp'])){
        $errors['mdp'] = 'Veuillez saisir un mot de passe !';
        $valide = false;
    }

    if(!isset($_POST['confirmMdp']) || empty($_POST['confirmMdp'])){
        $errors['confirmMdp'] = 'Veuillez saisir une confirmation de mot de passe !';
        $valide = false;
    }
     
    if($valide){
        if(checkDisponibilitePseudo()){
            if($_POST['mdp'] == $_POST['confirmMdp']){
                $query = 'INSERT INTO users (`pseudo`, `image`, `password`, `mail`) VALUES ("'
                .$_POST['login'].'","'.$_POST['image'].'","'.md5($_POST['mdp']).'", "")';
                $result = myQuery($query);

                if(!$result)
                    die('Erreur durant l\'insert du genre');
                return last_id($result);
            }else{
                $errors['mdpegaux'] = 'Veuillez saisir deux mots de passes identiques !';
                return false;
            }
        }else{
            $errors['pseudo'] = 'Veuillez saisir un autre pseudo !';
            return false;
        }
    }
    return false;
}