<?php
$file = "lists.json";

$jsonData = file_exists($file) ? file_get_contents($file) : "[]";

echo $jsonData;
?>