import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {amsterdamOffers as mockOffers} from './mocks/offers';
import {commentGets as mockCommentGet} from './mocks/comments';
import {createAPI} from './services/api';
//import {AuthorizationStatus} from './const';
import {applyMiddleware, createStore} from 'redux';
import {reducer} from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {fetchOffersAction} from './store/api-actions';
import {ThunkAppDispatch} from './types/action';

const api = createAPI();

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))),
);


(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

//() => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),

//const applyMiddleware = window.Redux.applyMiddleware;


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App favorites={mockOffers} comments={mockCommentGet} nearPlaces={mockOffers}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
