<?php

require_once('application/models/Salons.class.php');

$salon = new Salons();
$salonArray = $salon->getBy(false, ['nom']);

if (!empty($salonArray))
    echo json_encode($salonArray);
else
    echo '{}';

?>