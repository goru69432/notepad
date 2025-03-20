<?php
header('Content-Type: application/json'); // Set JSON header
include 'db.php';

$result = $conn->query("SELECT * FROM notes");
$notes = [];

while ($row = $result->fetch_assoc()) {
    $notes[] = $row;
}

echo json_encode($notes);

?>


