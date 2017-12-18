<!doctype html>
<html lang="fr">
<head>
    <title><?php if (isset($header['title'])){echo $header['title'];}?></title>
    <?php if (isset($header['description'])){echo "<meta name='description' content=\"".$header['description']."\" />\n";}?>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1,maximum-scale=1,minimum-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Playfair+Display:400,700|Roboto:400,700" rel="stylesheet">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon/favicon-32x32.png">
    <link rel='stylesheet' type='text/css' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' />
    <link rel='stylesheet' type='text/css' href='assets/css/reset.css' />

    <?php
    if (isset($header['css'])){
        foreach ($header['css'] as $fichier) {
            echo "<link rel='stylesheet' type='text/css' href='assets/css/".$fichier.".css' />\n";
        }
    }
    ?>
</head>
<body>
