import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import Games from './components/Games.js';
import GamePage from './components/GamePage.js';
import PlayerPage from './components/PlayerPage.js';

function App() {
  return (
    <div className="App">
    <Router basename="/nba">
      <Switch>
        <Route exact path="/" component={Games}/>
        <Route path='/player/:playerid' component={PlayerPage}/>
        <Route path="/:gameid" component={GamePage}/>
       
      </Switch>
    </Router>
    </div>
  );
}

export default App;
