import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";
import noteServices from './services/notes'
import Notification from "./components/Notification";
import Footer from "./components/Footer";


const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)



  useEffect(() => {
    noteServices
      .getAll()
      .then((initialData) => setNotes(initialData));
  },[])


  console.log("render", notes.length, "notes");

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };
    
    noteServices
      .create(noteObject)
      .then((returnedNote) => setNotes(notes.concat(returnedNote)))
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, importance: !note.importance}

    noteServices
      .update(id, changedNote)
      .then((returnedNote) =>
        setNotes(notes.map((note) => (note.id == id ? returnedNote : note))))
      .catch((error) => {
        setErrorMessage(
          `Note "${note.content}" was already removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id != id))
      })
    
  }

  const notesToShow = showAll 
    ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportance(note.id)}/>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer></Footer>
    </div>
  );
};

export default App;
