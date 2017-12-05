<?php 

// include('film.class.php');

// $film = new Film();
// $film->id_film = 3169;
// $film->hydrate();

// var_dump($film);

// $film->genre->nom = 'Je suis un méga genre';
// $film->genre->id_genre = 40;

// // Tenacious D in The Pick of Destiny

// $film->titre = 'Je suis un autre nom';

// $recup = $film->save();
// var_dump($recup);

// $film->genre->nom = 'Je le rename !';
// $recup = $film->save();
// var_dump($recup);

//doit dumper $film hydraté ($film->genre qui contient le genre hydraté et $film->distributeur qui contient le distributeur hydraté)

require_once('route.php');

if(empty($_GET['action']))
    $action = 'home';
else
    $action = $_GET['action'];

$controller_path = 'controller/'.$routes[$action].'.php';

if(is_file($controller_path))
    include($controller_path);
else 
    die('Illegal action : '.$action);

$view_path = 'views/'.$action.'.php';
if(is_file($view_path))
    include($view_path);
else
    die('template is missing : '.$view_path);

?>