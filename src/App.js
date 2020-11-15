import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Map from './components/Map';

import './styles/App.css';

function App() {
  return (
    <>
      <Header />

      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route exact path='/' component={Map} />
      </Switch>
    </>
  );
}

export default App;
