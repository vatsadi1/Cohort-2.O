//  import React, { useEffect, useState } from 'react'
//  import axios from 'axios'
//  import "./index.css"
//  import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
//  function App() {
//  const [notes,setnotes] = useState([])
//  const [editId,setEditId] = useState(null)
 
// // get notes 
// //  const fetchNotes = async()=>{

// //   const response = await fetch("http://localhost:3000/notes")

// //   const result = await response.json()
// //   setnotes(result.notes)
  


// //  }

// const fetchNotes = async ()=>{
//   const response = await axios.get("http://localhost:3000/notes")
//   setnotes(response.data.notes)
//   console.log(response.data.notes)
// }
//   useEffect(()=>{
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     fetchNotes()
//   },[])



// // post notes
//  function Submithandler(event){
// event.preventDefault()

// const {title , description} = event.target.elements
// //update
//  if(editId){
// axios.put("http://localhost:3000/api/notes/"+editId,{
//   title:title.value,
//   description:description.value
// })
// .then(res =>{
// toast.success("notes updated")
// setEditId(null)
// fetchNotes()
// event.target.reset()
// })
//  }else{
//   // create if not exist 
//   axios.post("http://localhost:3000/api/notes",{
//   title:title.value,
//   description:description.value
// })
// .then(res=>{
//   toast.success("notes created successfully")
//   fetchNotes()
// })
// event.target.reset()
//  }
//  }

// //delete notes
// function handleDelete(noteId){
//   axios.delete("http://localhost:3000/api/notes/"+noteId)
//   .then(res=>{
//     toast.success("notes deleted ")
//     fetchNotes()
//   })
 
// }
 
// // update notes

// function handleUpdate(note){
//   setEditId(note._id)
//   console.log(note._id)
//    document.querySelector('input[name="title"]').value = note.title
//   document.querySelector('input[name="description"]').value = note.description
// }


//    return (
// <>
//     <form className='note-create-form' onSubmit={Submithandler}>
// <input name='title' type='text' placeholder='Enter-title'/>
// <input name='description' type='text' placeholder='Enter-Description'/>
// <button>Create Notes</button>

//     </form>
//      <div className="notes">
 
//  {notes.map(note=>(
//   <div className='note'key={note._id}>
// <h1>{note.title}</h1>
// <p>{note.description}</p>
// <button onClick={()=>handleDelete(note._id)}>Delete</button>
// <button onClick={()=>handleUpdate(note)}>Edit</button>
//       </div>
//  ))}
       
//      </div>
//      <ToastContainer position="top-right" autoClose={2000} />
//   </>
//    )
//  }
 
//  export default App
 

 