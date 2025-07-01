const API = "http://localhost:5001/api/notes"; // Adjust port if needed
const noteForm = document.getElementById("noteForm");
const notesContainer = document.getElementById("notesContainer");
const statusBanner = document.createElement("div");
statusBanner.id = "statusBanner";
statusBanner.style.textAlign = "center";
statusBanner.style.padding = "10px";
statusBanner.style.display = "none";
document.body.prepend(statusBanner);

function showStatus(message, color = "#f44336") {
    statusBanner.textContent = message;
    statusBanner.style.backgroundColor = color;
    statusBanner.style.color = "white";
    statusBanner.style.display = "block";
    setTimeout(() => {
        statusBanner.style.display = "none";
    }, 3000);
}

async function fetchNotes() {
    try {
        const res = await fetch(API);
        if (res.status === 429) {
            showStatus("Too many requests. Please slow down.");
            return;
        }
        const notes = await res.json();
        notesContainer.innerHTML = "";
        notes.forEach(note => {
            const noteEl = document.createElement("div");
            noteEl.className = "note";
            noteEl.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <button onclick="getSpecificNote('${note._id}')">View</button>
                <button onclick="editNote('${note._id}', '${note.title}', '${note.content}')">Edit</button>
                <button class="delete" onclick="deleteNote('${note._id}')">Delete</button>
            `;
            notesContainer.appendChild(noteEl);
        });
    } catch (error) {
        showStatus("Server error while fetching notes.");
        console.error(error);
    }
}

noteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    try {
        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, content })
        });

        if (res.status === 429) {
            showStatus("Rate limit exceeded. Try again later.");
            return;
        }

        if (res.ok) {
            noteForm.reset();
            fetchNotes();
        } else {
            showStatus("Failed to create note.");
        }
    } catch (error) {
        showStatus("Network error while creating note.");
        console.error(error);
    }
});

async function deleteNote(id) {
    try {
        const res = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });
        if (res.status === 429) {
            showStatus("Rate limit exceeded. Try again later.");
            return;
        }
        fetchNotes();
    } catch (error) {
        showStatus("Error deleting note.");
        console.error(error);
    }
}

async function editNote(id, oldTitle, oldContent) {
    const title = prompt("Edit title:", oldTitle);
    const content = prompt("Edit content:", oldContent);
    if (title && content) {
        try {
            const res = await fetch(`${API}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, content })
            });
            if (res.status === 429) {
                showStatus("Rate limit exceeded. Try again later.");
                return;
            }
            fetchNotes();
        } catch (error) {
            showStatus("Error updating note.");
            console.error(error);
        }
    }
}

async function getSpecificNote(id) {
    try {
        const res = await fetch(`${API}/${id}`);
        if (res.status === 429) {
            showStatus("Rate limit exceeded. Try again later.");
            return;
        }
        const note = await res.json();
        alert(`Title: ${note.title}\n\nContent: ${note.content}`);
    } catch (error) {
        showStatus("Error fetching specific note.");
        console.error(error);
    }
}

// Initial load
fetchNotes();
