<?php
require_once('application/models/Users.class.php');

$users = new Users(1);
$users = $users->getBy([], ['pseudo']);
pr($users);
die();
?>