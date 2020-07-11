import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Survey from './components/Survey';
import AssetStore from './components/AssetStore';
import FaultDetail from './DataDetails';
import Tracker from './components/tracker';
import * as serviceWorker from './serviceWorker';
import {Switch,Route, BrowserRouter as Router} from 'react-router-dom'
import {createStore} from "redux";
import {Provider} from "react-redux";
import allReducers from "./reducers";

const  store=createStore(allReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const routing = (
    <Provider store={store}>
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/survey/:id/:date" component={Survey}/>
      <Route exact path="/asset/:store" component={AssetStore}/>
      <Route exact path="/tracker" component={Tracker}/>
        <Route exact path="/faultdetails" component={FaultDetail}/>
    </Switch>
  </Router>
    </Provider>

)
ReactDOM.render(routing, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
