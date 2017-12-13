<?php 
switch($action){
    case 'login':
    // Permet d'afficher toute la partie dédié au formulaire de connexion
        $header = array(
            'title' => 'Formulaire de login',
            'description' => 'Page d\'interface de connexion au Tchat',
            'css' => array(
                'auth/login',
            ),
            'js' => array(
                'main'
            ),
            'jquery' => true,
            'menu' => false,
            'footer' => false,
            'view' => array(
                'page' => 'auth/'.$action,
                'data' => array(),
            )
        );
        view('template', $header);
        break;
    case 'login_form':
    // Permet de faire le traitement du formulaire de connexion
        echo 'login_form';
        var_dump(DATABASE);
        require('application/models/functions/users.php');
        $users = getUser();
        if($users){
            setSessionUser($users);
            redirect('chat');
        }
        else{
            redirect('login');
        }

        break;
    case 'register':
    // Permet d'affichier toute la partie dédiée au formulaire d'inscription
        $header = array(
            'title' => 'Formulaire d\'inscription',
            'description' => 'Page d\'interface de d\'inscription au Tchat',
            'css' => array(
                'auth/login'
            ),
            'js' => array(
                'main'
            ),
            'jquery' => true,
            'menu' => false,
            'footer' => false,
            'view' => array(
                'page' => 'auth/'.$action,
                'data' => array(),
            )
        );
        view('template', $header);
        break;
    case 'register_form':
    // Permet de faire le traitement du formulaire d'inscription
        require('application/models/functions/users.php');
        $users = setUser();
        if($users){
            redirect('login');
        }
        else{
            redirect('register');
        }


        // $user = new User();
        // $user->nom = $_POST['nom'];
        // $user->prenom = $_POST['prenom'];
        //header location 
        break;
    default: 
        die('Erreur de routing dans AuthController.');
}