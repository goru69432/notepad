<?php
include 'db.php'; // Include the database connection

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['id']) && isset($_POST['note_text'])) {
    $noteId = $_POST['id'];
    $noteText = mysqli_real_escape_string($conn, $_POST['note_text']); // Sanitize input

    // Update the note in the database
    $sql = "UPDATE notes SET notes='$noteText' WHERE id=$noteId";
    if ($conn->query($sql) === TRUE) {
        echo "Note updated successfully";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>
