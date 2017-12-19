<?php 

require_once('application/models/Users.class.php');

if(isset($_SESSION['user_id'])){
    switch($action){
        case 'chat':
        // Permet d'afficher toute la partie dédié au formulaire de connexion
            refreshSession($_SESSION['user_id']);

            $header = array(
                'title' => 'Formulaire de login',
                'description' => 'Page d\'interface de connexion au Tchat',
                'css' => array(
                    'auth/login',
                    'chat/main'
                ),
                'js' => array(
                    'vue',
                    'main'
                ),
                'jquery' => true,
                'menu' => false,
                'footer' => false,
                'view' => array(
                    'page' => 'chat/'.$action,
                    'data' => array(),
                )
            );
            if(!isset($_GET['room']))
                $header['view']['data']['room'] = 'Generale';
            else
                $header['view']['data']['room'] = $_GET['room'];
            view('template', $header);
            break;
        default: 
            seterr('Erreur de routing dans ChatController.', 'ChatController');
    }
}else
    redirect('login');