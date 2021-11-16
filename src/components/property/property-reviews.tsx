import {State} from '../../types/types';
import FeedbackForm from './feedback-form';
import {Review} from './review';
import {connect, ConnectedProps} from 'react-redux';
import {MAX_COMMENTS_ON_PAGE} from '../../const';

const mapStateToProps = ({auth, details}: State) => ({
  comments: details.offerDetails.comments,
  isAuthorized: auth.isAuthorized,
  offerId: details.offerDetails.offer?.id,
});

const connector = connect(mapStateToProps);
type ConnectedPropertyReviewsProps = ConnectedProps<typeof connector>;

function PropertyReviews({comments, isAuthorized, offerId}: ConnectedPropertyReviewsProps): JSX.Element {
  const sortedComments = [...comments].sort( (a, b) => {
    if (a.date === b.date) {
      return 0;
    } else {
      return a.date > b.date ? -1 : 1;
    }}).slice(0, MAX_COMMENTS_ON_PAGE);
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {sortedComments.map( (c) => <Review key={c.id} comment={c}/>)}
      </ul>
      {isAuthorized && offerId && <FeedbackForm offerId={offerId}/>}
    </section>
  );
}

export default connector(PropertyReviews);
