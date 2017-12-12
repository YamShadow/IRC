<?php 

switch ($action) {
    case 'register':            // Renvoie le formulaire pour register
        view('Register'); 
        break;
    case 'register_form':       // Traite le formulaire
        require_once('../models/users.class.php');
        $user = new User();
        $user->nom = $_POST['nom'];
        $user->prenom = $_POST['prenom'];
    default: 
        die('Erreur de routing dans LogingController.');
}