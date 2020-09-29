import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import Profile from './components/Profile';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

function App() {
  return ( 
    <div id="app">
      <Profile></Profile>
    </div>
   );
}
 
export default App;

