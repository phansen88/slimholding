import React from "react";
import ReactDOM from "react-dom";
import './css/index.css';
import './css/App.css';
import logo from './logo.svg';
//import App from "./app";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function Home() {
    return <h2>Home</h2>;
  }
  
  function About() {
    return <h2>About</h2>;
  }
  
  function Users() {
    return <h2>Users</h2>;
  }
  
  
  function App() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            No need
          </p>
          <section>
        <Router>
        <div>
          <h1>hello</h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">Topics</Link>
            </li>
            <li>
              <Link to="/api/users">Users</Link>
            </li>
          </ul>
  
          <Routes>
            <Route path="/about" element={<About/>} />
            <Route path="/"  element={<Home/>} /> 
            <Route path="/api/users"  element={<Users/>} /> 
          </Routes>
        </div>
      </Router>
        </section>
        </header>
        
      </div>
    );
  }
  
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );