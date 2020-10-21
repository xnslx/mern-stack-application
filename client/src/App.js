import React from 'react';
import './App.css';
import {Switch, Router, Route} from 'react-router-dom';
import Nav from './component/nav/Nav';
import Main from './component/main/Main';

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path='/' exact component={Main}/>
      </Switch>
    </div>
  );
}

export default App;
