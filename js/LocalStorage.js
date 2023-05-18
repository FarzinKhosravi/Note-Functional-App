import {
  findNote,
  findNoteIndex,
  createCurrentNote,
  selectNotes,
  createNoteHTML,
  removeNotesStyle,
  setNoteStyle,
} from "./NoteApp.js";

let removedNotes = [];

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function getNotes() {
  return localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [];
}

function removeNote(notes) {
  const removeNoteButtons = [...document.querySelectorAll(".notes__remove")];
  const preview = document.querySelector(".notes__preview");

  // If there is no note, it will not show the preview :
  if (!notes.length > 0) {
    preview.style.visibility = "hidden";

    return;
  }

  removeNoteButtons.forEach((btn) => {
    const id = btn.dataset.id;

    btn.addEventListener("click", (event) => {
      if (notes.length == 1) {
        event.stopPropagation();

        const removedNote = findNote(id);

        notes = notes.filter((note) => note.id !== removedNote.id);

        saveNotes(notes);

        createNoteHTML(notes);

        removeNote(notes);

        removeNotesStyle();

        selectNotes();

        removedNotes = [...removedNotes, removedNote];
      } else if (notes.length >= 2) {
        event.stopPropagation();

        const removedNote = findNote(id);

        const removedNoteIndex = findNoteIndex(notes, id);

        // After deleting first note, next note is automatically selected:
        if (removedNoteIndex == 0) {
          const currentNoteIndex = removedNoteIndex + 1;

          // Selects the note and shows its preview :
          createCurrentNote(currentNoteIndex);
        }

        // After deleting every note(except first note), previous note is automatically selected:
        else {
          const currentNoteIndex = removedNoteIndex - 1;

          createCurrentNote(currentNoteIndex);
        }

        notes = notes.filter((note) => note.id !== removedNote.id);

        saveNotes(notes);

        createNoteHTML(notes);

        removeNote(notes);

        selectNotes();

        /*
          The note(next or previous) will be automatically styled,
          and the rest of the notes will be unstyled :
        */
        setNoteStyle(removedNoteIndex);

        removedNotes = [...removedNotes, removedNote];
      }
    });
  });
}

export { saveNotes, getNotes, removeNote, removedNotes };
