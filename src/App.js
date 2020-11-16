import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
} from 'react-router-dom';

import Dashboard from './views/Dashboard';
import Profile from './views/Profile';

import Navigation from './components/Navigation';

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
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/:userHandle" component={Profile} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
