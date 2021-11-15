// import logo from './logo.svg';
import './App.css';
import Login from './components/login/login';
import Messenger from './components/messenger/messenger';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // useNavigate,
} from 'react-router-dom'


function App() {
  // console.log("lol");
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Login /> */}
          <Route path='/' element={<Login />} />
          <Route exact path="/messenger" element={<Messenger />} />
        </Routes>
        {/* {!user ? <useNavigate to="/" /> : <Messenger />} */}
        {/* </Route> */}
      </div>
    </Router>
  );
}

export default App;
