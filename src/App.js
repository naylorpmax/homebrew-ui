import logo from './dragon-header-2.jpeg';
import './App.css';
import { React, useState, useEffect } from 'react';
import { Routes, Route, NavLink as Link, useLocation } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <header className="App-header"><img src={logo} className="App-logo" alt="logo"/></header>
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
          <li>
            <Link to="spell/lookup" activeclassname="active">Spells</Link>
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
          <Route path="spell/lookup" element={<Spell/>}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  )
}

const login = (url) => {
  fetch(url, {"method": "GET", "redirect": "follow"})
  .then(response => {
    if (response.redirected) {
      window.location.href = response.url;
    }
  })
  .catch(err => {
    console.log(err);
  });
};

const spell = async (url, body) => {
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  })
  .then(response => response.json())
  .then(response => {
    console.log("inside spell(): " + response["spells"].map((spell) => spell.name));
    return response
  })
  .catch(err => {
    console.log(err);
  })
}

export const Home = () => {
  return <div>You are in Home page</div>
}
export const About = () => {
  return <div>This is the page where you put details about yourself</div>
}

export const NotFound = () => {
  return <div>This is a 404 page</div>
}

export const Login = () => {
  const url = "http://localhost:8080/login"
  
  return (
    <button
      className="btn btn-primary"
      type="button"
      onClick={(_) => { login(url); }
      }
    >
      Login
    </button>
  )
}

export const Welcome = () => {
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const userName = searchParams.get("name");

  if (userName) {
    return <div>Welcome to Power Attack Publishing, {userName}!</div>
  }
  return <div>Welcome to Power Attack Publishing!</div>
}

export const Spell = () => {
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);

  const url = "http://localhost:8080/spell/lookup";
  const body = {}

  const spellName = searchParams.get("name");
  if (spellName) {
    body["name"] = spellName;
  }

  const spellLevel = searchParams.get("level");
  if (spellLevel) {
    body["level"] = spellLevel;
  }

  const [response, setResponse] = useState({});

  useEffect(() => {
    spell(url, body)
      .then(response => {
        setResponse(response);
        console.log("inside Spell().useEffect(): " + response)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  console.log("inside Spell(): " + response);

  return <div>
    got some spelllllls!
    {/* {
      response.map((spell) => {
        <h1>spell.name</h1>
      })
  } */}
  </div>
}

export default App;
