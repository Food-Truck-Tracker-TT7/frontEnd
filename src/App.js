import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import darkmode from './theme/darkmode';
import lightmode from './theme/lightmode';

import Header from './components/Header';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import Map from './components/Map';
import PrivateRoute from './components/PrivateRoute';
import DinerDashboard from './components/DinerDashboard';
import OperatorDashboard from './components/OperatorDashboard';
import Truck from './components/Truck';
import AddTruck from './components/AddTruck';
import MenuItem from './components/MenuItem';

import GlobalStyles from './styles/GlobalStyles';
// import './styles/App.css';

function App(props) {
  const { userType, darkMode } = props;
  return (
    <>
      <ThemeProvider theme={darkMode ? darkmode : lightmode}>
        <GlobalStyles />
        <Header />

        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <PrivateRoute path='/map' component={Map} />
          <PrivateRoute
            path='/dashboard'
            component={
              userType === 'diner' ? DinerDashboard : OperatorDashboard
            }
          />
          <PrivateRoute path='/truck/:id' component={Truck} />
          <PrivateRoute path='/addtruck' component={AddTruck} />
          <PrivateRoute path='/addmenuitem' component={MenuItem} />
          <PrivateRoute path='/edittruck' component={AddTruck} />
          <PrivateRoute path='/editmenuitem' component={MenuItem} />
          <Route exact path='/' component={Welcome} />
        </Switch>
      </ThemeProvider>
    </>
  );
}

const mapStateToProps = state => {
  return {
    userType: state.userType,
    darkMode: state.darkMode,
  };
};
export default connect(mapStateToProps, {})(App);
