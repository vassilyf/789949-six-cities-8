import {render, screen} from '@testing-library/react';
import {FiveStars} from './five-stars';


describe('Component: FiveStars', () => {
  it('should render correctly', () => {
    render(<FiveStars rating={3} onChangeRating={jest.fn()}/>);
    expect(screen.getAllByRole('radio').length).toEqual(5);
  });
});
