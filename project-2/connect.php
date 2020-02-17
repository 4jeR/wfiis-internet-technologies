<?php
    $host = "172.20.44.25";
    $db_name = "7dlugosz";
    $user = "7dlugosz";
    $password = "pass7dlugosz";

   
    $m = new MongoClient(); // connect

    $db = $m->$db_name; // wybór bazy 7dlugosz

    echo "POLACZONO!";

    echo "$db";

?>


