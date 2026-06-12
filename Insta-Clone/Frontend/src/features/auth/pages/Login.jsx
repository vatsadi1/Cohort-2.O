import "../style/form.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
 
export default function Login() {
 
  const{user,loading,handleLogin} = useAuth()
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

   async function handleSubmit(e) {
  
  e.preventDefault()

await handleLogin(username,password)
 
navigate('/')

toast.success("Logged in successfully")
   }

 if (loading) {
        return (<main>
            <h1>Loading.....</h1>
        </main>)
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
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
          className="mock"
        />
      </div>

      {/* RIGHT */}
      <div className="right">
        <form onSubmit={handleSubmit} className="form">
          <h2>Log into Instagram</h2>

          <input
            name="username"
            placeholder="Mobile number, username or email"
          onInput={(e)=>{setUsername(e.target.value)}}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
           onInput={(e)=>{setPassword(e.target.value)}}
          />

          <button className="login-btn">Log in</button>

          <p className="forgot">Forgot password?</p>

          <button type="button" className="outline">
            Log in with Facebook
          </button>

          <button type="button" className="outline blue">
            <Link to="/register">
            Create new account
            </Link>
          </button>

          <p className="meta">Meta</p>
        </form>
      </div>
    </div>
  );
}