// Get elements
const saveBtn = document.getElementById('saveBtn');
const showBtn = document.getElementById('showBtn');
const noteText = document.getElementById('noteText');
const savedNotes = document.getElementById('savedNotes');
const notesList = document.getElementById('notesList');

// Save note function
saveBtn.addEventListener('click', () => {
    const note = noteText.value.trim();
    if (note) {
        const formData = new FormData();
        formData.append('note_text', note);

        // Send a POST request to save the note
        fetch('save_note.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            noteText.value = ''; // Clear the textarea
            loadNotes(); // Reload the notes list
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Please write something in the note!');
    }
});

// Show saved notes function
showBtn.addEventListener('click', () => {
    savedNotes.style.display = savedNotes.style.display === 'none' ? 'block' : 'none';
});

// Fetch all notes
function loadNotes() {
    fetch('fetch_notes.php')
        .then(response => response.json())
        .then(notes => {
            notesList.innerHTML = ''; // Clear the existing list
            notes.forEach(note => {
                const li = document.createElement('li');
                li.textContent = note.note_text;

                // Create Edit and Delete buttons
                const buttonGroup = document.createElement('div');
                buttonGroup.classList.add('button-group');

                const editBtn = document.createElement('button');
                editBtn.classList.add('editBtn');
                editBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>'; // Pencil icon for edit
                editBtn.addEventListener('click', () => {
                    noteText.value = note.note_text; // Pre-fill the textarea with note text
                    deleteNote(note.id); // Optionally delete the note after editing
                });

                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('deleteBtn');
                deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Trash icon for delete
                deleteBtn.addEventListener('click', () => {
                    deleteNote(note.id); // Delete the note
                });

                // Append buttons to the list item
                buttonGroup.appendChild(editBtn);
                buttonGroup.appendChild(deleteBtn);
                li.appendChild(buttonGroup);

                // Add the new note with buttons to the list
                notesList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Delete note function
function deleteNote(id) {
    const formData = new FormData();
    formData.append('id', id);

    fetch('delete_notes.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
    
        loadNotes(); // Reload the notes list after deletion
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Load notes when the page loads
window.onload = loadNotes;
