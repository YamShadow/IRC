<?php

require_once('application/models/Salons.class.php');


if (checkPost('nom') && checkPost('id_type')) {
    $salon = new Salons();
    $ts = new TypesSalon($_POST['id_type']);
    
    $salon->type_salon = $ts;
    $salon->nom = $_POST['nom'];
} else
    $errors['fill'] = 'Tous les champs attendus n\'étaient pas remplis.';

if (!empty($errors))
    echo json_encode(['errors' => $errors]);
else {
    $salon->save();
    echo '{}';
}

?>