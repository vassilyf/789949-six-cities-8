import React from 'react';
import {ThunkAppDispatch} from '../../types/action';
import {saveReview} from '../../store/api-actions';
import {connect, ConnectedProps} from 'react-redux';
import {MIN_COMMENT_SIZE, MAX_COMMENT_SIZE} from '../../const';
import {OperationStatus, Review, State} from '../../types/types';
import {setReview} from '../../store/action';
import {FiveStars} from './five-stars';

type FeedbackFormProps = {
  offerId: number
}

const mapStateToProps = ({DETAILS}: State) => ({
  review: DETAILS.review,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSaveReview(e: React.MouseEvent<HTMLButtonElement>, id: string, rating: number, comment: string) {
    e.preventDefault();
    dispatch(saveReview(id, rating, comment));
  },
  onChangeReview(review: Review) {
    dispatch(setReview(review));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectedFeedbackFormProps = ConnectedProps<typeof connector> & FeedbackFormProps;

function FeedbackForm(props: ConnectedFeedbackFormProps): JSX.Element {
  const {offerId, review, onSaveReview, onChangeReview} = props;
  const submitAvailable = review.comment
    && review.comment.length >= MIN_COMMENT_SIZE
    && review.comment.length <= MAX_COMMENT_SIZE
    && review.reviewSavingStatus !== OperationStatus.InProcess;
  const onChangeRating = (r: number) => {
    if (review.reviewSavingStatus !== OperationStatus.InProcess) {
      onChangeReview({...review, rating: r} );
    }
  };
  const onChangeComment = (c: string) => {
    if (review.reviewSavingStatus !== OperationStatus.InProcess) {
      onChangeReview({...review, comment: c} );
    }
  };
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <FiveStars onChangeRating={onChangeRating} rating={review.rating} />
      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.comment} onChange={ (e) => onChangeComment(e.target.value) }
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" disabled={!submitAvailable}
          onClick={ (e) => onSaveReview(e, String(offerId), review.rating, review.comment) }
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default connector(FeedbackForm);
