import './App.css';
import { React, useState } from 'react';
import { Routes, Route, NavLink as Link, useLocation } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/" activeclassname="active" end>Home</Link>
          </li>
          <li>
            <Link to="about" activeclassname="active">About</Link>
          </li>
          <li>
            <Link to="login" activeclassname="active">Login</Link>
          </li>
        </ul>
      </nav>
      <div className="main">
        {/* Define all the routes */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route path="welcome" element={<Welcome/>}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export const Home = () => {
  return <div>You are in Home page</div>
}
export const About = () => {
  return <div>This is the page where you put details about yourself</div>
}

export const Welcome = () => {
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const url = "http://localhost:8080/welcome" + "?" + searchParams.toString();

  const [name, setName] = useState("");

  const get = (url) => {
    fetch(url, { "method": "GET", "redirect": "follow" })
    .then(response => response.json())
    .then(response => {
      setName(response["name"]);
    })
    .catch((err) => {
      console.log("error getting welcome page: " + err);
    })
  };

  get(url);

  return <div>Welcome to Power Attack Publishing, {name}!</div>
}

export const NotFound = () => {
  return <div>This is a 404 page</div>
}
export const Login = () => {
  const url = "http://localhost:8080/login"

  const get = (url) => {
    fetch(url, {"method": "GET", "redirect": "follow"})
    .then(response => {
      if (response.redirected) {
        window.location.href = response.url;
      }
    })
    .catch(err => {
      console.log(err)
    });
  };
  
  return (
    <button
      className="btn btn-primary"
      type="button"
      onClick={(_) => { get(url); }
      }
    >
      Login
    </button>
  )
}

export default App;
