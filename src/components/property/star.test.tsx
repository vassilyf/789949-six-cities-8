import {render, screen} from '@testing-library/react';
import {Star} from './star';


describe('Component: Star', () => {
  it('should render correctly', () => {
    render(<Star starPosition={1} rating={2} onChangeRating={jest.fn()}/>);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });
});
