import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { AuthProvider } from "./context/AuthContext"


function App() {


  return (
    
   <div>
    <AuthProvider>
    <Navbar/>
    <Outlet />
    <Footer/>
    </AuthProvider>
   </div>
  )
}

export default App
