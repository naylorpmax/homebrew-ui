import logo from './dragon-header-2.jpeg';
import './App.css';
import { React } from 'react';
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
          {/* <Route path="spell/lookup" element={<Spell/>}></Route> */}
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
    console.log(err)
  });
};

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
  const userName = searchParams.get("name")

  if (userName) {
    return <div>Welcome to Power Attack Publishing, {userName}!</div>
  }
  return <div>Welcome to Power Attack Publishing!</div>
}

// export const Spell = () => {

//   const url = "http://localhost:8080/spell/lookup"
//   const body = {
//     "name": 
//   }
// }

export default App;
