import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';

import MainPage from '../main-page/main-page';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import Property from '../property/property';
import PrivateRoute from '../private-route/private-route';
import ErrorPage from '../error-page/error-page';
import {AppRoute} from '../../const';
import {Offer, Comment, State} from '../../types/types';
import {amsterdamOffers} from '../../mocks/offers';
import {connect, ConnectedProps} from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen';
import browserHistory from '../../browser-history';

type AppProps = {
  favorites: Offer[],
  comments: Comment[]
  nearPlaces: Offer[],
}

const mapStateToProps = ({isDataLoaded, authorizationStatus}: State) => ({
  isDataLoaded: isDataLoaded,
  authorizationStatus: authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedAppProps = PropsFromRedux & AppProps;

function App(props : ConnectedAppProps): JSX.Element {
  const {comments, favorites, nearPlaces, isDataLoaded, authorizationStatus} = props;
  // eslint-disable-next-line no-console
  console.log(`App authStatus ${authorizationStatus}`);
  if (!isDataLoaded) {
    return <LoadingScreen/>;
  } else {
    return (
      <BrowserRouter history={browserHistory}>
        <Switch>
          <Route exact path={AppRoute.Main}>
            <MainPage/>;
          </Route>
          <PrivateRoute
            exact
            path={AppRoute.Favorites}
            render={() => <Favorites favorites={favorites}/>}
            authorizationStatus={authorizationStatus}
          >
          </PrivateRoute>
          <Route exact path={AppRoute.Room}>
            <Property offer={amsterdamOffers[0]} comments={comments} nearPlaces={nearPlaces}/>
          </Route>
          <Route exact path={AppRoute.SignIn}>
            <Login/>
          </Route>
          <Route>
            <ErrorPage/>
          </Route>
        </Switch>
      </BrowserRouter>);
  }
}

export default connector(App);
