import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themeFile from './utils/theme';
import AuthRoute from './utils/AuthRoute';
import './App.css';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import axios from 'axios';

const theme = createMuiTheme(themeFile);

const token = localStorage.getItem('FBIdToken');
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  // check if token is expired
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
