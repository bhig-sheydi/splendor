import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./page/Home.JSX";
import Navbar from "./component/Navbar";



function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
        
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
