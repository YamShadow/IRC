<?php

require_once('application/models/Users.class.php');

if (checkPost('id_a') && checkPost('id_b') && checkPost('id_etat')) {
    $user = new Users($_POST['id_a']);

    $user->addFriend($_POST['id_b'], $_POST['id_etat']);
} else $errors['fill'] = 'Tous les champs devant être fournis ne le sont pas.';

if (!empty($errors)) 
    echo json_encode(['errors' => $errors]);
else
    echo json_encode($userArray);
?>