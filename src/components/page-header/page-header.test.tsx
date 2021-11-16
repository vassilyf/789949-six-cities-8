import {configureMockStore} from '@jedmao/redux-mock-store';
import {TEST_AUTH_INFO} from '../../mocks/auth';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import PageHeader from './page-header';


const mockStore = configureMockStore();

describe('Component: PageHeader', () => {
  it('render sign out link if authorized', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      auth: {currentUser: TEST_AUTH_INFO, isAuthorized: true},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <PageHeader />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('render login link if not authorized', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      auth: {currentUser: TEST_AUTH_INFO, isAuthorized: false},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <PageHeader />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
