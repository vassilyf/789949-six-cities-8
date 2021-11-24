import React from 'react';
import {FiveStarsProps} from '../five-stars';

type StarProps = FiveStarsProps & {
  starPosition: number,
}

export function Star({rating, onChangeRating, starPosition}: StarProps): JSX.Element {
  return (
    <React.Fragment>
      <input className="form__rating-input visually-hidden" name="rating" value={starPosition}
        checked={starPosition === rating} id={`${starPosition}-stars`}
        type="radio" onChange={() => onChangeRating(starPosition)}
      />
      <label htmlFor={`${starPosition}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </React.Fragment>
  );
}
