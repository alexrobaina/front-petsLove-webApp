import { ComponentType } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import navigation from './navigation/navigation';
import WrapperConfig from './components/WrapperConfig';
import store from './store';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import PrivateRoute from './navigation/PrivateRoute';
import { LOGIN, DASHBOARD } from './navigation/routes/routes';
import './App.scss';
import axiosInterceptors from './store/api/axiosInterceptors';

axiosInterceptors(localStorage.getItem('token') || '');

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <WrapperConfig>
            <>
              <Route exact path={LOGIN} component={Login} />
              {navigation.map((nav: { path: string; component: ComponentType }) => {
                return <Route key={nav.path} path={nav.path} component={nav.component} />;
              })}
              <PrivateRoute
                exact
                path={DASHBOARD}
                redirectPath={LOGIN}
                component={Dashboard}
              />
            </>
          </WrapperConfig>
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
