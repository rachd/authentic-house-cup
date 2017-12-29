import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';
import Results from './components/Results';
import Sorting from './components/Sorting';

class App extends Component {
  render() {
    const routes = [
      { path: '/sorting',
        component: Sorting
      },
      { path: '/',
        component: Results
      }
    ]

    const RouteWithSubRoutes = (route) => (
      <Route exact path={route.path} render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes}/>
      )}/>
    )
    return(<Router>
      <div>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))}
      </div>
    </Router>);
  }
}

export default App;
