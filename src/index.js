import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import Dashboard from './views/Dashboard';
import Profile from './views/Profile';

import Navigation from './components/Navigation';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

function App() {
  return (
    <div id="app">
      <Router>
        <div id="app-container">
          <Navigation />

          <Switch>
            <Route
              exact
              path="/"
              component={() => <Redirect to="/dashboard" />}
            />
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
