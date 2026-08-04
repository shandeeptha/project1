<?php

include("db.php");

$playerid=$_POST['playerid'];
$playername=$_POST['playername'];
$category=$_POST['category'];
$task=$_POST['task'];
$projectlink=$_POST['projectlink'];

$sql="INSERT INTO participants
(playerid,playername,category,task,projectlink)
VALUES
('$playerid','$playername','$category','$task','$projectlink')";

if(mysqli_query($conn,$sql))
{
    echo "<script>
    alert('Project Submitted Successfully');
    window.location='index.html';
    </script>";
}
else
{
    echo "Error";
}

?>