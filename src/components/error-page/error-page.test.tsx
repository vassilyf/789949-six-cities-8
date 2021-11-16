import {render, screen} from '@testing-library/react';
import ErrorPage from './error-page';

describe('Component: ErrorPage', () => {
  it('should render correctly', () => {
    render(<ErrorPage/>);
    expect(screen.getByText('Application error')).toBeInTheDocument();
  });
});
