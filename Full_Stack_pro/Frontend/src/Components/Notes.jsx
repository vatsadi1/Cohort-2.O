import React, { useEffect, useState } from "react";
import "../index.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function Notes() {
  const URI = import.meta.env.Render_URI || " "
  const [notes, setNotes] = useState([]);

  const [input, setInput] = useState({
    title: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);

  // get data

  function fetchNotes() {
    axios.get(`${URI}/notes`).then((res) => {
      setNotes(res.data.notes);
    })
    .catch((err)=>{
      toast.error(err.response?.data?.message || "fetch failed")
    })
  }
  useEffect(() => {
    fetchNotes();
  }, []);

  // form handle
  function Submithandler(e) {
    e.preventDefault();

    // validitor for both--> if no data return no api call always use this
    if (input.title.trim() === "" || input.description.trim() === "") {
    toast.error("Please fill in all fields");
    return;
    }
    if (editId) {
      axios
        .put(`${URI}/api/notes/` + editId, input)
        .then((req) => {
          toast.success("notes updated ");
          setEditId(null);
          fetchNotes();
          setInput({ title: "", description: "" });
        })
        .catch((err) => {
       toast.error(err.response?.data?.message || "Updated Failed failed");
      });
    } else {
      
      axios.post(`${URI}/api/notes`, input)
      .then((res) => {
        toast.success("notes created Successfully");
        fetchNotes();
      })
      .catch((err) => {
       toast.error(err.response?.data?.message || "Create failed");
      });
      setInput({ title: "", description: "" });
    }
  }
   

  // delete notes
  function handleDelete(noteId) {
    axios.delete(`${URI}api/notes/` + noteId).then((res) => {
      toast.success("notes deleted");
      fetchNotes();
    });
  }

  // update notes

  function handleUpdate(note) {
    setEditId(note._id);
    setInput({
      title: note.title,
      description: note.description,
    });
  }

  return (
    <>
      <form className="note-create-form" onSubmit={Submithandler}>
        <input
          name="title"
          type="text"
          value={input.title}
          onChange={(e) => setInput({ ...input, title: e.target.value })}
          placeholder="Enter-title"
        />
        <input
          name="description"
          type="text"
          value={input.description}
          onChange={(e) => setInput({ ...input, description: e.target.value })}
          placeholder="Enter-Description"
        />
        <button>Create Notes</button>
      </form>
      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note._id}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
            <button onClick={() => handleUpdate(note)}>Edit</button>
          </div>
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default Notes;
