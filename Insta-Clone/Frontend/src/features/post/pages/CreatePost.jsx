import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePost } from '../hook/usePost'
 
function CreatePost() {

    const navigate = useNavigate()
const {handlecreatepost,loading} = usePost()
    const [caption , setCaption] = useState("")
    const Postiamgefile = useRef(null)

    async function handlesubmit(e) {
e.preventDefault()
        const file =  Postiamgefile.current.files[0]

        await handlecreatepost(file,caption)
        console.log(file)
        navigate('/feed')
    }

    if(loading){
        return <main><h1>creating post...</h1></main>
    }

  return (
    <main className='create-post-page' >
            <div className="form-container">
                <h1>Create post</h1>
                <form onSubmit={handlesubmit}>
                    <label className='post-image-label' 
                   
                    htmlFor="postImage">Select image</label>
                    <input   ref={Postiamgefile} hidden type="file" name='postImage' id='postImage' />
                    <input
                        type="text" name='caption' id='caption' 
                        value={caption}
                        onChange={((e)=>setCaption(e.target.value))}
                        placeholder='Enter Caption' />
                    <button className='button primary-button' >create post</button>
                </form>
            </div>
        </main>
     
  )
}

export default CreatePost
