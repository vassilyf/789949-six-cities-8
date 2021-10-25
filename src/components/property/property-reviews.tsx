import { Comment } from '../../types/types';
import {FeedbackForm} from './feedback-form';
import {Review} from './review';

type PropertyReviewsProps = {
  comments: Comment[],
}

export function PropertyReviews({comments}: PropertyReviewsProps): JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
      <ul className="reviews__list">
        {comments.map( (c) => <Review key={c.id} comment={c}/>)}
      </ul>
      <FeedbackForm/>
    </section>
  );
}
