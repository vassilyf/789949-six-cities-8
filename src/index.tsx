import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers as mockOffers} from './mocks/offers';
import {commentGets as mockCommentGet} from './mocks/comments';

const Settings = {
  CARDS_COUNT: 5,
};


ReactDOM.render(
  <React.StrictMode>
    <App cardsCount={Settings.CARDS_COUNT} offers={mockOffers} favorites={mockOffers} comments={mockCommentGet} nearPlaces={mockOffers}/>
  </React.StrictMode>,
  document.getElementById('root'));
