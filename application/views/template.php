<?php
//Intégration de la partie head
include('dom/header.php');

// Intégration d'un section commune à plusieurs templates sans variable
if((isset($header['menu']) && $header['menu']))
    include('dom/menu');

// Intégration d'une partie variante
if(isset($header['view']['page']) && $header['view']['page'] != '')
    view($header['view']['page'], $header['view']['data']);

// Intégration d'un section footer
if((isset($header['footer']) && $header['footer']))
    include_once('commons/t_standard/footer');

// Ajout (ou non) de jQuery
if (isset($header['jquery']) && $header['jquery'])
    echo "<script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'></script>\n";

// Ajout du JS
if (isset($header['js'])){
    foreach ($header['js'] as $fichier) {
        echo "<script type='text/javascript' src='assets/js/'.$fichier.'.js'></script>\n";
    }
}

// Intégration d'un section commune à plusieurs templates sans variable
include_once('dom/eof.php');