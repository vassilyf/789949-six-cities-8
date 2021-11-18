import {Switch, Route} from 'react-router-dom';

import MainPage from '../main-page/main-page';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import Property from '../property/property';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../error-page/not-found-page';
import ErrorPage from '../error-page/error-page';
import {AppRoute} from '../../const';
import {State} from '../../types/types';
import {connect, ConnectedProps} from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen';

const mapStateToProps = ({offers, auth}: State) => ({
  isDataLoaded: offers.isDataLoaded,
  authorizationStatus: auth.isAuthorized,
});

const connector = connect(mapStateToProps);
type ConnectedAppProps = ConnectedProps<typeof connector>;

function App(props : ConnectedAppProps): JSX.Element {
  const {isDataLoaded} = props;
  if (!isDataLoaded) {
    return <LoadingScreen/>;
  } else {
    return (
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainPage/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <Favorites/>}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.Room}>
          <Property />
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <Login/>
        </Route>
        <Route exact path={AppRoute.ApplicationError}>
          <ErrorPage/>
        </Route>
        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>
    );
  }
}

export default connector(App);
