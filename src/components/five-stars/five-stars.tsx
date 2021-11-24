import React from 'react';
import {Star} from './star/star';

export type FiveStarsProps = {
  rating: number,
  onChangeRating: (rating: number) => void,
}

const stars = [...Array(5).keys()].map( (n) => n + 1 ).reverse();

export function FiveStars(props: FiveStarsProps): JSX.Element {
  return (
    <div className="reviews__rating-form form__rating">
      {stars.map( (pos) => <Star key={pos} starPosition={pos} {...props} />)}
    </div>
  );
}

