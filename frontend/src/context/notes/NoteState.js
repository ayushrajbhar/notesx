import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const [notes, setNotes] = useState([]);


  // Alert
  const [alert, setAlert] = useState({show:false,msg:''});

  const showAlert = (msg)=>{
    setAlert({show: true, msg})
    setTimeout(()=>{
      setAlert({show:false,msg:''})
    }, 3000)
  }

  // Getting a note
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      },
    });
    const notesInitial = await response.json();
    setNotes(notesInitial);
  }

  // Adding a note
  const addNote = async (title, description, tag) => {

    const note = {
      "user": "647a413cfad8902abf2eac25",
      "title": title,
      "description": description,
      "tag": [].concat(tag)
    }

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      },
      body: JSON.stringify(note),
    });
    const json = response.json();
    console.log(json)
    getAllNotes()
  }

  // Deleting a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      },
    });
    console.log(response.json())
    getAllNotes()
    showAlert("The note has been deleted")
  }

  // Editing a note
  const editNote = async (id, title, description, tag) => {
    let newTag
    for (let index = 0; index < notes.length; index++) {
      const note = notes[index];
      if (note._id === id) {
        newTag = note.tag.concat(tag).filter((tag) => { return tag.trim() !== '' })
      }
    }
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
      },
      body: JSON.stringify({title, description, tag: newTag}),
    });
    console.log(response.json())
    getAllNotes()
  }


  // Modal
  const [modal, setModal] = useState(false);
  const [modalValue, setModalValue] = useState({ id: '', title: '', description: '', tags: '' })

  const viewModal = (id, title, description, tags) => {
    setModalValue({ id: id, title: title, description: description, tags: tags })
  }

  const showModal = () => {
    setModal(true)
  }

  const hideModal = () => {
    setModal(false)
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, modal, showModal, hideModal, addNote, deleteNote, modalValue, viewModal, editNote, getAllNotes, alert, showAlert }}>
      {props.children}
    </NoteContext.Provider>
  )
};

export default NoteState;