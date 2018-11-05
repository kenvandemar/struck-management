import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect } from 'react-router-dom';

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

import history from './Config/history';
import Footer from './components/Footer';
import './App.css';
import Header from './components/Header';

const store = createStore();
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Header />
        <div className="App">
          <Route path="/Home" component={Home} />
          <Route path="/edit" component={EditTruck} />
          <Route path="/create" component={CreateTruck} />
          <Route path="/show/:id" component={ShowTruck} />
          <Route exact path="/" render={() => <Redirect to="/auth/login" />} />
          <Route exact path="/auth/login" component={Login} />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
