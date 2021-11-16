import {render, screen} from '@testing-library/react';
import {CitiesMenu} from './cities-list';
import {AMSTERDAM, PARIS} from '../../mocks/cities';


describe('Component: CitiesMenu', () => {
  it('should render correctly', () => {
    render(<CitiesMenu cities={[PARIS, AMSTERDAM]} selectedName={PARIS.name} onSelectCity={jest.fn()} />);
    expect(screen.getByText(PARIS.name)).toBeInTheDocument();
    expect(screen.getByText(AMSTERDAM.name)).toBeInTheDocument();
  });
});
