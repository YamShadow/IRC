<?php 
require_once('application/models/Users.class.php');
/*
Methode conf_baseurl qui permet en fonction des méthode défine de definir la base_url
*/

function conf_baseurl($prod, $git, $ssl){
    $url = $ssl ? 'https://' : 'http://';
    if($prod{strlen($prod)-1} != '/'){ $prod = $prod.'/'; }
    if (ENVIRONMENT == 'production'){
        if($prod{strlen($prod)-1} != '/'){ $prod = $prod.'/'; }
        return $url . $prod;
    }

    if( $_SERVER['SERVER_NAME'] == 'localhost')
        $url .= 'localhost/';
    if($git{strlen($git)-1} != '/'){ $git = $git.'/'; }
    return $url . $git;
}

/*
Methode conf_bdd qui permet en fonction des méthode défine de linké une base de donnée local ou en prod
*/

function conf_bdd($database){
    if (ENVIRONMENT == 'production') return $database['prod'];
    if( $_SERVER['SERVER_NAME'] == 'localhost') return $database['localhost'];
}

/***** Traitement *****/

/**
* Methode logs qui permet de crée un log
* @param $message
*/

function logs($message, $module){
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {$ip = $_SERVER['HTTP_CLIENT_IP'];}
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];}
    else {$ip = $_SERVER['REMOTE_ADDR'];}
    
    $date = new DateTime('now', new DateTimeZone('Europe/Paris'));
    if(!is_dir('logs/')){mkdir('logs/', '750');}
    $log = fopen('logs/'.date('Ymd-H').'.txt', 'a+');
    $prepare = "[".$date->format('Y-m-d H:i:s')."][".$module."] ".$ip." à l'adresse ".$_SERVER['PHP_SELF']."  - ".$message.PHP_EOL.PHP_EOL;
    fputs($log, $prepare);
    fclose($log);
}

function view($view, $header = null){
    $view_path = 'application/views/'.$view.'.php';

    if(is_file($view_path))
        include($view_path);
    else{
        logs('View inconnue: '.$view, 'index.php');
        die('template is missing : '.$view_path);
    }
}

function redirect($action){
    header('Location: index.php?action='.$action);
}

function seterr($msg, $module, $ajax = false) {
    if (ENVIRONMENT == 'production') {
        if (!$ajax) {
            header('x', true, 500);
            echo '<br />Veuillez contacter un administrateur système ou réessayer plus tard.';
        } else 
            echo '{}';

        exit();
    } else if (ENVIRONMENT == 'development') {
        logs($msg, $module);
        if ($ajax) die('{}');
        die('An error has occured. Please consult logs file.');
    }
}

function pr($chose) {
    var_dump($chose);
    echo '<hr>';
}

function checkPost($name) {
    return isset($_POST[$name]) && !empty($_POST[$name]);
}

function checkGet($name) {
    return isset($_GET[$name]) && !empty($_GET[$name]);
}

function checkSession($name) {
    return isset($_SESSION[$name]) && !empty($_SESSION[$name]);
}

function refreshSession($user_id) {
    $user = new Users($user_id);
    $user->setUserSession();
}