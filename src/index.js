import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Survey from './components/Survey';
import AssetStore from './components/AssetStore';
import * as serviceWorker from './serviceWorker';
import {Switch,Route, BrowserRouter as Router} from 'react-router-dom'
const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/survey/:id/:date" component={Survey}/>
      <Route exact path="/asset/:store" component={AssetStore}/>
    </Switch>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
