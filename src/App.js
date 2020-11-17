import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/Header';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import Map from './components/Map';
import PrivateRoute from './components/PrivateRoute';
import DinerDashboard from './components/DinerDashboard';
import OperatorDashboard from './components/OperatorDashboard';

import './styles/App.css';

function App(props) {
  const { userType } = props;
  return (
    <>
      <Header />

      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <PrivateRoute path='/map' component={Map} />
        <PrivateRoute
          path='/dashboard'
          component={userType === 'diner' ? DinerDashboard : OperatorDashboard}
        />
        <Route path='/' component={Welcome} />
      </Switch>
    </>
  );
}

const mapStateToProps = state => {
  return {
    userType: state.userType,
  };
};
export default connect(mapStateToProps, {})(App);
