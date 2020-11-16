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

// sample user data
import userData from './user-data.json';

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
              <Profile userData={userData} />
            </Route>
            <Route path="/dashboard">
              <Dashboard userData={userData} />
            </Route>
            <Route path="/:userHandle" component={PublicProfile} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function PublicProfile() {
  const { userHandle } = useParams();

  // only temporary
  // matches userhandle from param to user data from friendslist, found in sample user data
  const findUserData = (userHandle) => {
    const [friendUserData] = userData.friends.filter((friend) => {
      if (userHandle === friend.userHandle) return friend;
    });
    return friendUserData;
  };
  return <Profile userData={findUserData(userHandle)} />;
}

export default App;
