import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import SortingMenu from './sorting-menu';
import {SortingSelection} from '../../../types/types';

const mockStore = configureMockStore();
const store = mockStore({
});

describe('Component: SortingMenu', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <SortingMenu sortingSelection={SortingSelection.Popular}/>
        </Router>
      </Provider>,
    );
    expect(screen.getByTestId('sorting-caption')).toHaveTextContent('Popular');

  });
});
