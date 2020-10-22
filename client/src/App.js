import React from 'react';
import './App.css';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import Nav from './component/nav/Nav';
import Main from './component/main/Main';
import Signup from './component/signup/Signup';
import Login from './component/login/Login';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path='/signup' component={Signup}/>
          <Route path='/login' component={Login}/>
          <Route path='/' exact component={Main}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
