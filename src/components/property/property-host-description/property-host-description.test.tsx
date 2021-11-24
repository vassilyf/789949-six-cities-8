import {render, screen} from '@testing-library/react';
import {PropertyHostDescription} from './property-host-description';
import {TEST_AUTH_INFO} from '../../../mocks/auth';

describe('Component: PropertyHostDescription', () => {
  it('should render correctly', () => {
    const descriptionTextList = ['Description text', 'another description'];
    render(<PropertyHostDescription host={TEST_AUTH_INFO} descriptions={descriptionTextList}/>);
    for (const text of descriptionTextList) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
  });
});

