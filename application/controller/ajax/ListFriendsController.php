<?php

require_once('application/models/Users.class.php');
if (checkPost('user_id')) {
    $user = new Users($_POST['user_id']);
    
    $arrayFriends = $user->getFriends();
    
    if (!empty($arrayFriends))
        echo json_encode($arrayFriends);
    else
        echo '{}';

} else 
    echo '{"errors": ["fill":"Tous les champs devant être fournis ne le sont pas."]}';

?>