import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import UserStatus from './user-status';
import {TEST_AUTH_INFO} from '../../mocks/auth';
import {configureMockStore} from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({
  auth: TEST_AUTH_INFO,
});

describe('Component: UserStatus', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <UserStatus currentUser={TEST_AUTH_INFO} />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
