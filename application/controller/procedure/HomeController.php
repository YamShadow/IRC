<?php 

switch($action){
    case 'home':
    // Permet d'afficher toute la partie dédié au formulaire de connexion
            $header = array(
                'title' => 'Formulaire de login',
                'description' => 'Page d\'interface de connexion au Tchat',
                'css' => array(
                    'auth/login',
                    'main'
                ),
                'js' => array(
                    'main'
                ),
                'jquery' => true,
                'menu' => false,
                'footer' => false,
                'view' => array(
                    'page' => $action,
                    'data' => array(
                        'welcome_message' => 'Bienvenue sur le chat'
                    ),
                )
            );
            view('template', $header);
            break;
}
