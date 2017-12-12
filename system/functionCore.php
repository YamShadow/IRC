<?php 

function conf_baseurl($prod, $git, $ssl){
    $url = $ssl ? 'https://' : 'http://';
    if($prod{strlen($prod)-1} != '/'){ $prod = $prod.'/'; }
    if (ENVIRONMENT == 'production'){
        if($prod{strlen($prod)-1} != '/'){ $prod = $prod.'/'; }
        return $url . $prod;
    }

    if( $_SERVER['SERVER_NAME'] == 'localhost')
        $url .= 'localhost/';
    else if ($_SERVER['SERVER_NAME'] == 'unidev.pushup.agency'){
        $url .= 'unidev.pushup.agency/';
        if (strpos($_SERVER['PHP_SELF'], 'preprod'))
            $url .= 'preprod/';
        else
            $url .= 'production/';
    }
    if($git{strlen($git)-1} != '/'){ $git = $git.'/'; }
    return $url . $git;
}

function conf_bdd($database){
    if (ENVIRONMENT == 'production') return $database['prod'];
    if( $_SERVER['SERVER_NAME'] == 'localhost') return $database['localhost'];
    else if ($_SERVER['SERVER_NAME'] == 'unidev.pushup.agency') return $database['unidev'];
}