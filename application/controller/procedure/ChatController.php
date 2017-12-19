<?php 

if(isset($_SESSION['user_pseudo'])){
    switch($action){
        case 'chat':
        // Permet d'afficher toute la partie dédié au formulaire de connexion
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
            view('template', $header);
            break;
        default: 
            die('Erreur de routing dans ChatController.');
    }
}else
    redirect('login');