import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import createStore from './reducers/configureStore';

// Component for route
import Login from './views/Login';
import Home from './views/Home';
import ShowTruck from './views/ShowTruck';
import CreateTruck from './views/CreateTruck';
import EditTruck from './views/EditTruck';

const store = createStore();
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/edit/:id" component={EditTruck} />
        <Route path="/create" component={CreateTruck} />
        <Route path="/show/:id" component={ShowTruck} />
        <Route path="/auth/login" component={Login} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
