import React from 'react';
import './App.css';
import {Switch, Router, Route} from 'react-router-dom';
import Nav from './component/nav/Nav';
import Main from './component/main/Main';
import Signup from './component/signup/Signup';

function App() {
  return (
      <div>
        <Nav />
          <Route path='/signup' component={Signup}/>
          <Route path='/' exact component={Main}/>
      </div>
  );
}

export default App;
