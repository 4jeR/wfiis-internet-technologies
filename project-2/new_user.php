
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible">
    <meta name="author" content="Bartłomiej Długosz">
    <title>Projekt 2 - techniki internetowe 2019/2020</title>
    <link rel = "stylesheet" href = "style/style.css" type = "text/css" />


</head>
<body>
    <div id = "topper">
        <h1>Witaj na stronie głównej!</h1>
    </div>

    <div id = "container">
        <div id ="nav">
        <form action="index.php" method="post">
            <input type="submit" value = "Powrót do strony głównej."/>
        </form>
            
        </div>
        
        <div id = "content">
            <h1>Zarejestrowano pomyślnie!</h1><br/>
            ZAMIAST TEGO PONIŻEJ:
            <?php
                $login = $_POST['login'];
                $password = $_POST['password'];

                echo $login."</br>".$password;
            
            ?>
            </br>
            POŁĄCZENIE Z BAZĄ DANYCH
            </br>
            
                
        </div>
        
        <div id = "footer">
            <b>Techniki internetowe projekt 2 - Bartłomiej Długosz &copy; Wszelkie prawa zastrzeżone.</b>
        </div>
    </div>
</body>
</html>
