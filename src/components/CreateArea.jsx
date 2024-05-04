import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
        
      };
    });
  }

  function submitNote(event) {
    const { indexedNote } = props;
    const { title, content} = note;
    

    fetch("http://localhost:8081/addNote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, id:indexedNote}),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Note added successfully to MySQL:", data);
      console.log("Indexed Note: in create area", indexedNote);
      
      
      // Optionally, you can update the state here if needed

      props.onAdd(note);
      
    })
    .catch(error => {
      console.error("Error adding note to MySQL:", error);
    });

    setNote({
      title: "",
      content: ""
    });

    event.preventDefault();
  }

  

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
