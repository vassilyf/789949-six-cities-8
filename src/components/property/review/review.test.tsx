import {render, screen} from '@testing-library/react';
import {Review} from './review';
import {TEST_COMMENT_GET_RESULT} from '../../../mocks/comments';

describe('Component: Review', () => {
  it('should render correctly', () => {
    const comment = TEST_COMMENT_GET_RESULT[0];
    render(<Review comment={comment} />);
    expect(screen.getByText(comment.comment)).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
  });
});
