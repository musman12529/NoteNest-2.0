import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/getNotes")
      .then(response => response.json())
      .then(data => {
        setNotes(data); // Update state with fetched data
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);


  function addNote(newNote) {
    setNotes(prevNotes => {
      console.log("New Note:", newNote);
      // Add index to the new note object
      const indexedNote = { ...newNote, index: prevNotes.length };
      // console.log("Indexed Note:", indexedNote);
      // Update state with the new note object
      return [...prevNotes, indexedNote];
    });
  }

  

  

  function deleteNote(id) {
    fetch(`http://localhost:8081/deleteNote/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(data => {
        console.log("Note deleted successfully from MySQL:", data);
        // If deletion is successful, update the state to remove the deleted note
        setNotes(prevNotes => prevNotes.filter((noteItem, index) => index !== id));
      })
      .catch(error => {
        console.error("Error deleting note from MySQL:", error);
      });
  }
 

  

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} indexedNote={notes.length } />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;




