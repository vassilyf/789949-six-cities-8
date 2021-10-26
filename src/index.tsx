import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import {amsterdamOffers as mockOffers} from './mocks/offers';
import {commentGets as mockCommentGet} from './mocks/comments';
import {reducer} from './store/reducer';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App offers={mockOffers} favorites={mockOffers} comments={mockCommentGet} nearPlaces={mockOffers}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
