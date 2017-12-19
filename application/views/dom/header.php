<!doctype html>
<html lang="fr">
<head>
    <title><?php if (isset($header['title'])){echo $header['title'];}?></title>
    <?php if (isset($header['description'])){echo "<meta name='description' content=\"".$header['description']."\" />\n";}?>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1,maximum-scale=1,minimum-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Playfair+Display:400,700|Roboto:400,700" rel="stylesheet">
    <link rel='stylesheet' type='text/css' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' />
    <link rel='stylesheet' type='text/css' href='assets/css/reset.css' />

    <link rel="apple-touch-icon" sizes="57x57" href="assets/images/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="assets/images/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="assets/images/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="assets/images/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="assets/images/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="assets/images/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="assets/images/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="assets/images/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/images/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="assets/images/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="assets/images/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/favicon/favicon-16x16.png">
    <link rel="manifest" href="assets/images/favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="assets/images/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <?php
    if (isset($header['css'])){
        foreach ($header['css'] as $fichier) {
            echo "<link rel='stylesheet' type='text/css' href='assets/css/".$fichier.".css' />\n";
        }
    }
    ?>
</head>
<body>
