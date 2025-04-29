<?php

$data = json_decode(file_get_contents("php://input"), true);

$file = "lists.json";
$jsonData = file_exists($file) ? file_get_contents($file) : "[]";
$lists = json_decode($jsonData, true);

$taskName = $data['taskName'];
$targetId = $data['listId'];  
$taskId = uniqid();

$newTask = ['taskId' => $taskId, 'taskName' => $taskName,'isCompleted' => false , 'taskTime' => 0];

for ($i = 0; $i < count($lists); $i++) {
    if ($lists[$i]['listId'] === $targetId) {
        array_push($lists[$i]['taskList'], $newTask);
        break;
    }
}
echo json_encode($newTask, JSON_PRETTY_PRINT);
file_put_contents($file, json_encode($lists, JSON_PRETTY_PRINT));
?>