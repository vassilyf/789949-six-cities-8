import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {TEST_AMSTERDAM_OFFERS} from '../../mocks/offers';
import {configureMockStore} from '@jedmao/redux-mock-store';
import UniversalPlaceCard, {WrapperType} from './place-card';
import {TEST_AUTH_STATE_AUTHORIZED} from '../../mocks/state';

const mockStore = configureMockStore();
const store = mockStore({
  auth: TEST_AUTH_STATE_AUTHORIZED,
});

describe('Component: UniversalPlaceCard', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const offer = TEST_AMSTERDAM_OFFERS[0];
    render(
      <Provider store={store}>
        <Router history={history}>
          <UniversalPlaceCard offer={offer} cardType={WrapperType.Cities}/>
        </Router>
      </Provider>,
    );
    expect(screen.getByText(offer.title)).toBeInTheDocument();
  });
});
