import { RouterProvider } from "react-router-dom";
import AppRotes from "./AppRoutes.jsx";
import "./style.scss";
import "./features/shared/globle.scss"
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { PostContexProvider } from "./features/post/post.context.jsx";
function App() {
  return (
    <>
    <AuthProvider> 
      <PostContexProvider> 
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRotes />
      </PostContexProvider>
      </AuthProvider>
    </>
  );
}

export default App;
