import {render, screen} from '@testing-library/react';
import {LoginLink} from './login-link';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {TEST_AUTH_INFO} from '../../mocks/auth';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';


const mockStore = configureMockStore();
const store = mockStore({
  auth: TEST_AUTH_INFO,
});

describe('Component: LoginLink', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginLink/>
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
