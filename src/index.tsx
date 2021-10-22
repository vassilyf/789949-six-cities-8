import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers as mockOffers} from './mocks/offers';
import {commentGets as mockCommentGet} from './mocks/comments';


//<App cardsCount={Settings.CARDS_COUNT} offers={mockOffers} favorites={mockOffers} comments={mockCommentGet} nearPlaces={mockOffers}/>
//<App points={[]} city={CITY} />

//import {City} from './types/types';

//const CITY: City = {
//  title: 'Нью-Йорк',
//  lat: 40.835292,
//  lng: -73.916236,
//  zoom: 10,
//};

ReactDOM.render(
  <React.StrictMode>
    <App offers={mockOffers} favorites={mockOffers} comments={mockCommentGet} nearPlaces={mockOffers}/>
  </React.StrictMode>,
  document.getElementById('root'));
