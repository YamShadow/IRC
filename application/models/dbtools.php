<?php
    
    function dbQuery($query) {
        global $link;

        if (empty($link))
            $link = mysqli_connect(DATABASE['hostname'], DATABASE['username'], DATABASE['password'], DATABASE['database']) or die (mysqli_connect_error());
        //$result = mysqli_query($link, mysqli_real_escape_string($link, htmlspecialchars($query))) or die (mysqli_error($link));
        $result = mysqli_query($link, $query) or seterr(mysqli_error($link), 'dbTools.dbQuery');
        return $result;
    }

    function dbFetchAssoc($query) {
        global $link;

        $result = dbQuery($query) or seterr(mysqli_error($link), 'dbTools.dbFetchAssoc');
        if (!$result)
            return false;
        $tab_res = mysqli_fetch_assoc($result);
        return $tab_res;
    }
    
    function dbFetchAllAssoc($query) {
        global $link;

        $result = dbQuery($query) or seterr(mysqli_error($link), 'dbTools.dbFetchAllAssoc');
        if (!$result)
            return false;

        $tab_res = [];

        while ($array = mysqli_fetch_assoc($result))
            $tab_res[] = $array;
        return $tab_res;
    }

    function dbLastId($query) {
        global $link;
        
        return mysqli_insert_id($link);
    }
?>