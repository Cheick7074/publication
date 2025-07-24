import React, { useState, useEffect } from "react";
import "./BlocNote.css";

function BlocNote() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("blocnotes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("blocnotes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (input.trim() === "") return;
    setNotes([...notes, { text: input, id: Date.now() }]);
    setInput("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id, newText) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      addNote();
    }
  };

  return (
    <div className="blocnote-container">
      <h2>Bloc Note</h2>
      <div className="blocnote-input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Écris une note..."
          className="blocnote-input"
        />
        <button onClick={addNote} className="blocnote-add-btn">Ajouter</button>
      </div>
      <ul className="blocnote-list">
        {notes.map((note) => (
          <li key={note.id} className="blocnote-list-item">
            <input
              value={note.text}
              onChange={(e) => editNote(note.id, e.target.value)}
              className="blocnote-note-input"
            />
            <button onClick={() => deleteNote(note.id)} className="blocnote-delete-btn">Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlocNote; 