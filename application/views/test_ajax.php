<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="ret"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script>
        $(function (){
            $.ajax({
                method: 'POST',
                url: 'ajax.php?action=listSalons',
                data: {
                    salon_id: 1
                }
            }).done(function (data) {
                $('#ret').text(JSON.stringify(data, null, '\t'));
            });
        });
    </script>
</body>
</html>