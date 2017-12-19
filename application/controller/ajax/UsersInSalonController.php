<?php 

require_once('application/models/Salons.class.php');

if (checkPost('salon_id')) {
    if (is_numeric($_POST['salon_id'])) {
        $salon = new Salons($_POST['salon_id']);
        $usrArray = $salon->getUsers();
        
        if ($usrArray) 
            echo json_encode($usrArray);
        else
            echo '{}';

    } else
        seterr('ID du salon fourni non numérique', 'AJAX.UserInSalon', true);

} else
    seterr('ID du salon non fourni.', 'AJAX.UserInSalon', true);