<?php
require_once('application/models/Users.class.php');

$user = new Users(1);
$user->pseudo = '2alheure';
$user->save();
$usr = new Users(1);
pr($usr);
die();
?>