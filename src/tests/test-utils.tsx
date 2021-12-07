import { Children, cloneElement } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

const middlewares: any = [];
const mockStore = configureStore(middlewares);

const Providers = ({ children, store }: any) => {
  return <Provider {...{ store }}>{children}</Provider>;
};

const customRender = (ui: any, options: any) => {
  const { initialState, route } = options || {};
  const history = createMemoryHistory({ initialEntries: [route] });
  const store = mockStore(initialState || {});
  store.dispatch = jest.fn(store.dispatch);

  return {
    store,
    ...render(
      <Router history={history}>
        <Providers {...{ store }}>
          {Children.map(ui, (child: any) => cloneElement(child, { route }))}
        </Providers>
      </Router>,
    ),
    history,
  };
};

export * from '@testing-library/react';

export { customRender as render, userEvent };
