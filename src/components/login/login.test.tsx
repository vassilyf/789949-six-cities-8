import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import Login from './login';
import {TEST_AUTH_STATE_AUTHORIZED} from '../../mocks/state';


const mockStore = configureMockStore();
const store = mockStore({
  auth: TEST_AUTH_STATE_AUTHORIZED,
});

describe('Component: Login', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>,
    );
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });
});
