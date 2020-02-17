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
            <form action="show_data.php" method="post">
            <input type="submit" value = "Pokaż wyniki ankiety."/>
            </form></br></br>
            
        </div>
        
        <div id = "content">
            <h2>Zaloguj się w serwisie</h2>
            <h3>Nie masz konta?</h3>
            <form action="register.php" method="post">
            <input type="submit" value = "Zarejestruj się."/>
            </form></br></br>
            <form action = "validate_login.php" method ="post">
                Login:
                <input type = "text" name="login"/><br/>
                Hasło:
                <input type="password" name = "password"/></br></br>
                <input type="submit" value = "Zaloguj się"/>
            </form>
                
        </div>
        
        <div id = "footer">
            <b>Techniki internetowe projekt 2 - Bartłomiej Długosz &copy; Wszelkie prawa zastrzeżone.</b>
        </div>
    </div>
</body>
</html>




