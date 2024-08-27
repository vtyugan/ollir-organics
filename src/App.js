import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <Router>
      <Home />
    </Router>
    );
}

export default App;
