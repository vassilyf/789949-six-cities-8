import {Route, Redirect} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import {AppRoute} from '../../const';
import {State} from '../../types/types';
import {connect, ConnectedProps} from 'react-redux';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
}

const mapStateToProps = ({auth}: State) => ({
  isAuthorized: auth.isAuthorized,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedPrivateRouteProps = PropsFromRedux & PrivateRouteProps;


function PrivateRoute(props: ConnectedPrivateRouteProps): JSX.Element {
  const {exact, path, render, isAuthorized} = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (isAuthorized ? render() : <Redirect to={AppRoute.SignIn} />
      )}
    />
  );
}

export default connector(PrivateRoute);
