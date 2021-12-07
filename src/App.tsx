import { ComponentType } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import navigation from './navigation/navigation';
import WrapperConfig from './components/WrapperConfig';
import store from './store';
import './App.scss';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <WrapperConfig>
            <>
              {navigation.map((nav: { path: string; component: ComponentType }) => {
                return <Route key={nav.path} path={nav.path} component={nav.component} />;
              })}
            </>
          </WrapperConfig>
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
