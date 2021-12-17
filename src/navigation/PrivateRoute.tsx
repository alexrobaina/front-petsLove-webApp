import { FC, createElement } from 'react';
import { Redirect, Route } from 'react-router-dom';

interface Props {
  path: string;
  component: FC;
  exact: boolean;
  redirectPath: string;
}

const PrivateRoute: FC<Props> = ({
  path,
  component,
  redirectPath,

  ...rest
}) => {
  const token = localStorage.getItem('token') || '';
  const isAuthenticated = token !== '';

  const routeComponent = (props: any) =>
    isAuthenticated ? (
      createElement(component, props)
    ) : (
      <Redirect exact to={{ pathname: redirectPath }} />
    );
  return <Route path={path} {...rest} render={routeComponent} />;
};

export default PrivateRoute;
