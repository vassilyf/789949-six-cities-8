import {Switch, Route, BrowserRouter} from 'react-router-dom';

import MainPage from '../main-page/main-page';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import Property from '../property/property';
import PrivateRoute from '../private-route/private-route';
import ErrorPage from '../error-page/error-page';
import {AppRoute, AuthorizationStatus} from '../../const';
import {OfferType, CommentType} from '../../types/types';


type AppProps = {
  cardsCount: number,
  offers: OfferType[],
  favorites: OfferType[],
  comments: CommentType[]
  nearPlaces: OfferType[]
}

function App({cardsCount, offers, comments, favorites, nearPlaces} : AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainPage cardsCount={cardsCount} offers={offers} />;
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <Favorites favorites={favorites} />}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.Room}>
          <Property offer={offers[0]}  comments={comments} nearPlaces={nearPlaces}  />
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <Login />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>);
}

export default App;
