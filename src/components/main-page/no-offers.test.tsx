import {render, screen} from '@testing-library/react';
import {NoOffers} from './no-offers';
import {AMSTERDAM} from '../../mocks/cities';


describe('Component: NoOffers', () => {
  it('should render correctly', () => {
    render(<NoOffers selectedCity={AMSTERDAM}/>);
    expect(screen.getByText(`We could not find any property available at the moment in ${AMSTERDAM.name}`)).toBeInTheDocument();
  });
});
