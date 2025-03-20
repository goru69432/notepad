<?php
include 'db.php'; // Include the database connection

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['note_text'])) {
    $noteText = mysqli_real_escape_string($conn, $_POST['note_text']); // Sanitize input

    // Insert the note into the database
    $sql = "INSERT INTO notes (note_text) VALUES ('$noteText')";
    if ($conn->query($sql) === TRUE) {
        echo "Note saved successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>
