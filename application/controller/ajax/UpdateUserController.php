<?php

require_once('application/models/Users.class.php');

if (checkPost('user_id') && ((checkPost('mdp') && checkPost('confirmMdp')) || checkPost('login') || checkPost('mail') || checkPost('image'))) {
    $user = new Users($_POST['user_id']);

    if (checkPost('mdp') && checkPost('confirmMdp') && $_POST['mdp'] === $_POST['confirmMdp'])
        $user->password = md5($_POST['mdp']);

    if (checkPost('login'))
        $user->pseudo = $_POST['login'];

    if (checkPost('mail'))
        $user->mail = $_POST['mail'];
        
    if (checkPost('image'))
        $user->image = $_POST['image'];
    
} else $errors['fill'] = 'Aucune donnée à modifier reçue.';

if (isset($errors))
    echo json_encode(['errors' => $errors]);
else {
    $user->save();
    refreshSession($user->id);
    echo json_encode($user);
}


?>