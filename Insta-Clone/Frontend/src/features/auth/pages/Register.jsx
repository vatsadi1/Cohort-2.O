
import "../style/form.scss";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {   toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../hooks/useAuth";


export default function Register() {
  
  const {loading,handleRegister} = useAuth()

 const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
const navigate = useNavigate()


 async function  handleSubmit  (e) {
    e.preventDefault()

    await handleRegister(username,email,password)
  toast.success("Registration successful 🎉");
  navigate("/")
  }
    if(loading){
      return(<main><h1>Loading...</h1></main>)
    }

  return (
    <div className="container">
      
      {/* LEFT */}
      <div className="left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
          className="logo"
        />

        <h1>
          See everyday moments from your <br />
          <span>close friends.</span>
        </h1>

        <img
          src="https://media.gettyimages.com/id/2067467976/photo/india-v-england-5th-test-match-day-two.jpg?s=1024x1024&w=gi&k=20&c=9_H2QuFkHL0pFiiaUdy4fcvOWhlxghlHCodtkDk0iY0="
          className="mock"
        />
      </div>

      {/* RIGHT */}
      <div className="right">

      <form onSubmit={handleSubmit}className="form">
         <h2>Sign up for Instagram</h2>
          <input type="text" 
          onInput={(e)=>{setUsername(e.target.value)}}
          name="username"
          placeholder=" Enter a username...">
          </input>
          <input type="email" 
          onInput={(e)=>{setEmail(e.target.value)}}
          name="email"
          placeholder="Enter an email...">
            
          </input>
          <input type="password"
          onInput={(e)=>{setPassword(e.target.value)}}
          name="password"
          placeholder="Enter a password..."></input>
          <button className="login-btn"type="submit">Register</button>

          <p className="forgot">Forgot password?</p>

          <button type="button" className="outline">
            Log in with Facebook
          </button>

          <button type="button" className="outline blue">
             
            Already have an account? <Link to="/login"className="toggleAuthForm">Login</Link>
             
          </button>

          <p className="meta">Meta</p>
        </form>
         
      </div>
    </div>
    
  );
}