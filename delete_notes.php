<?php
include 'db.php'; // Include the database connection

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['id'])) {
    $noteId = $_POST['id'];

    // Delete the note from the database
    $sql = "DELETE FROM notes WHERE id=$noteId";
    if ($conn->query($sql) === TRUE) {
        echo "Note deleted successfully";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
