import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import Bookmark, {Bookmark as RawBookmark} from './bookmark';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {TEST_AMSTERDAM_OFFERS} from '../../mocks/offers';
import {TEST_AUTH_STATE_AUTHORIZED} from '../../mocks/state';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const store = mockStore({
  auth: TEST_AUTH_STATE_AUTHORIZED,
});

describe('Component: Bookmark', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const offer = TEST_AMSTERDAM_OFFERS[0];
    expect(offer.is_favorite).toEqual(true);
    const onSaveFavorite = jest.fn();
    render(
      <Provider store={store}>
        <Router history={history}>
          <Bookmark offer={offer} onSaveFavorite={onSaveFavorite} />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
  });

  it('save to favorites, authorized state', () => {
    const offer = TEST_AMSTERDAM_OFFERS[0];
    expect(offer.is_favorite).toEqual(true);
    const onSaveFavorite = jest.fn();
    const onToLogin = jest.fn();
    render(
      <RawBookmark offer={offer} isAuthorized onSaveFavorite={onSaveFavorite} onToLogin={onToLogin}/>,
    );
    expect(screen.getByText('In bookmarks')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));

    expect(onSaveFavorite).toBeCalled();
    expect(onSaveFavorite).nthCalledWith(1, offer.id, !offer.is_favorite);
    expect(onToLogin).not.toBeCalled();
  });

  it('save to favorites, unauthorized state', () => {
    const offer = TEST_AMSTERDAM_OFFERS[0];
    expect(offer.is_favorite).toEqual(true);
    const onSaveFavorite = jest.fn();
    const onToLogin = jest.fn();
    render(
      <RawBookmark offer={offer} isAuthorized={false} onSaveFavorite={onSaveFavorite} onToLogin={onToLogin}/>,
    );
    expect(screen.getByText('In bookmarks')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));

    expect(onToLogin).toBeCalled();
    expect(onSaveFavorite).not.toBeCalled();
  });

});
