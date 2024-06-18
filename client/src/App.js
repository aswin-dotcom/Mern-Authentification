import { Route, Routes,Navigate } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

function App() {
  axios.defaults.baseURL = "http://localhost:3500";
  axios.defaults.withCredentials = true;
  const[auth,Setauth]=useState(false);
  

  return (
    <div className="App">
      <Toaster
        position="bottom-right"
        toastOptions={{
          // Define default options

          duration: 5000,
      
        }}
      />
      <Navbar />
      <Routes>
                
                        <Route path="/" element={<Login auth={auth} Setauth={Setauth} />} />
                        <Route path="/register" element={<Register  />} />
                        <Route path="*" element={<Navigate to="/" />} />
               
                        <Route path="/Dashboard" element={<Dashboard auth={auth} Setauth={Setauth} />} />
                        
                   
            </Routes>
    </div>
  );
}

export default App;
