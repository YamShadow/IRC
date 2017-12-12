<?php 


switch($action){
    case 'login':
        echo 'login';

        $data['title'] = 'lol';




        break;
    case 'login_form':
        echo 'login_form';
        break;




}

view($action);