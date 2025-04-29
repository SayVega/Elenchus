<?php
$data = json_decode(file_get_contents("php://input"), true);

$file = "lists.json";
$jsonData = file_exists($file) ? file_get_contents($file) : "[]";
$lists = json_decode($jsonData, true);

$listText = $data['listName'];
$listId = uniqid();
$newList = ['listId' => $listId, 'listName' => $listText, "taskList" => [["totalHours" => 0]]];

$lists[] = $newList;

file_put_contents($file, json_encode($lists, JSON_PRETTY_PRINT));
echo json_encode($newList, JSON_PRETTY_PRINT);
