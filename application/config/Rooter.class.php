<?php 

require_once('route.php');

class Rooter {
    public function parse($url) {

        $method = strpbrk($url, ':');

        return ['controller' => $controller, 'method' => $method];
    }
}