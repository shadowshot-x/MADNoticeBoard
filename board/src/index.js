import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './components/Admin';
import WebLink from './components/WebLink';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';

const routing = (
  <Router>
    <div>
      <Route path="/adminPage" component={Admin} />
      <Route path="/webLink" component={WebLink} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))