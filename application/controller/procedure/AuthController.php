<?php 

require_once('application/models/Users.class.php');

switch($action){
    case 'logout':
    // Permet de se déconnecter
        session_destroy();

        redirect('home');

        break;

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
        $userArray = array();

        if (checkPost('login') && checkPost('mdp')) {
            $user = new Users();
            $userArray = $user->getBy([
                'pseudo' => $_POST['login'], 
                'password' => md5($_POST['mdp'])
            ]);
        } else $errors['fill'] = 'Veuillez saisir les champs requis.';
        
        if (!empty($userArray)) {
            $user = $userArray[0];
            $user->setUserSession();
            redirect('chat');
        } else
            redirect('login');

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
        if (checkPost('login') && checkPost('mdp') && checkPost('confirmMdp')) {
            if ($_POST['mdp'] !== $_POST['confirmMdp'])
                $errors['mdp'] = 'Vos mots de passe ne correspondent pas';
            
            
            $user = new Users();
            
            $user->pseudo = $_POST['login'];
            $user->password = md5($_POST['mdp']);
            $user->pseudo = $_POST['login'];
            $user->mail = $_POST['mail'];
            $user->image = $_POST['image'];

            $usrVerif = $user->getBy([
                'pseudo' => $user->pseudo
            ]);

            if (!empty($usrVerif)) 
                $errors['login'] = 'Le pseudo est déjà pris.';
        } else {
            $errors['fill'] = 'Veuillez saisir tous les champs requis.';
        }

        if (!isset($errors)) {
            $user->save();
            redirect('login');
        } else 
            redirect('register');

        break;
    default: 
        seterr('Erreur de routing dans AuthController.', 'AuthController');
}