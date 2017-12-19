<?php 

require_once('application/models/Users.class.php');

if (checkPost('salon_id')) {
    if (is_numeric($_POST['salon_id'])) {
        $user = new Users();
        $usrArray = $user->getBy([
            'connected' => 1,
            'channelConnected' => $_POST['salon_id']
        ], [
            'pseudo'
        ]);
        
        if (!empty($usrArray))
            echo json_encode($usrArray);
        else
            echo '{}';

    } else
        seterr('ID du salon fourni non numérique', 'AJAX.UserInSalon', true);

} else
    seterr('ID du salon non fourni.', 'AJAX.UserInSalon', true);