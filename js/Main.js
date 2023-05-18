import { appHTML, setupApp, addNote, setNotesScroll } from "./NoteApp.js";

document.addEventListener("DOMContentLoaded", () => {
  appHTML();

  // Sets notes that already exist :
  setupApp();

  addNote();

  // Sets scroll notes with drag and drop :
  setNotesScroll();
});
