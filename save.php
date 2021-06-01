<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$filename = $_POST["filename"];
$content = $_POST["content"];

if( file_put_contents("./results/".$filename, $content) ){
  echo("{\"result\": \"ok\"}");
}
else {
  echo("{\"result\": \"error\"}");
}


?>
