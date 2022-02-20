import logo from './logo.svg';
import './App.css';
import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.get = this.get.bind(this);
  }

  // componentDidMount() {

  // }

  handleChange(changeObject) {
    this.setState(changeObject)
  }

  get(e) {
    fetch("http://localhost:8080/login", {"method": "GET"})
    .then(response => {
      this.setState({redirectURL: response["url"]})
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <button className="btn btn-primary" type="button" onClick={(e) => this.get({id: e.target.value})}>
        Login
      </button>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Login></Login>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
