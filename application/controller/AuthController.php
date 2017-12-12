<?php 
switch($action){
    case 'login':
        echo 'login';
        $data['title'] = 'lol';

        view('auth/'$action);
        break;
    case 'login_form':
        echo 'login_form';
        break;
    case 'register':            // Renvoie le formulaire pour register
        view('auth/'.$action); 
        break;
    case 'register_form':       // Traite le formulaire
        require_once('models/users.class.php');
        $user = new User();
        $user->nom = $_POST['nom'];
        $user->prenom = $_POST['prenom'];
        //header location 
    default: 
        die('Erreur de routing dans AuthController.');
}