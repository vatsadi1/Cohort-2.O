import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Feed from "./features/post/pages/Feed";
import CreatePost from "./features/post/pages/CreatePost";
import Profile from "./features/Profile/Pages/profile";
 

const AppRotes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register"element={<Register/>}/>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/create-post" element={<CreatePost/>}/>
        <Route path="/profile"element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
};
 export default AppRotes