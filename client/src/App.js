import React from 'react';
import './App.css';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from './reducer/index';
import Nav from './component/nav/Nav';
import Main from './component/main/Main';
import Signup from './component/signup/Signup';
import Login from './component/login/Login';
import Dashboard from './component/dashboard/Dashboard';
import PrivateRoute from './component/PrivateRoute';
import FindPassword from './component/findpassword/FindPassword';
import ResetPassword from './component/resetPassword/ResetPassword';

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route path='/signup' component={Signup}/>
            <Route path='/login' component={Login}/>
            <PrivateRoute  exact path='/dashboard' component={Dashboard}/>
            <Route path='/' exact component={Main}/>
            <Route path='/findpassword' component={FindPassword}/>
            <Route path='/updatepassword/:token' component={ResetPassword}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
