<?php

$conn = new mysqli("localhost","root","","ai_prompt");

if($conn->connect_error){
    die("Connection Failed");
}

?>