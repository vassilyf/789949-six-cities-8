import {Switch, Route, BrowserRouter} from 'react-router-dom';

import MainPage from '../main-page/main-page';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import Property from '../property/property';
import PrivateRoute from '../private-route/private-route';
import ErrorPage from '../error-page/error-page';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Offer, Comment, State} from '../../types/types';
import {amsterdamOffers} from '../../mocks/offers';
import {Dispatch} from 'redux';
import {Actions} from '../../types/action';
import {connect, ConnectedProps} from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen';

type AppProps = {
  favorites: Offer[],
  comments: Comment[]
  nearPlaces: Offer[],
}

const mapStateToProps = ({isDataLoaded}: State) => ({
  isDataLoaded: isDataLoaded,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedAppProps = PropsFromRedux & AppProps;

function App({comments, favorites, nearPlaces, isDataLoaded} : ConnectedAppProps): JSX.Element {
  if (!isDataLoaded) {
    return <LoadingScreen/>;
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={AppRoute.Main}>
            <MainPage/>;
          </Route>
          <PrivateRoute
            exact
            path={AppRoute.Favorites}
            render={() => <Favorites favorites={favorites}/>}
            authorizationStatus={AuthorizationStatus.NoAuth}
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
