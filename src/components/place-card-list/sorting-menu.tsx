import React, {useState} from 'react';
import {Offer, SortingSelection} from '../../types/types';
import {Dispatch} from 'redux';
import {Actions} from '../../types/action';
import {connect, ConnectedProps} from 'react-redux';
import {setSortingSelection} from '../../store/action';

type SortingMenuProps = {
  sortingSelection: SortingSelection
}

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeSorting(selection: SortingSelection) {
    dispatch(setSortingSelection(selection));
  },
});

const connector = connect(null, mapDispatchToProps);
type ConnectedSortingMenuProps = ConnectedProps<typeof connector> & SortingMenuProps;

type OffersComparator = (o1: Offer, o2: Offer) => number;

const sortingSelectionList = [
  {
    key: SortingSelection.Popular,
    value: 'Popular',
    sortingFunction: function(o1: Offer, o2: Offer) {return o2.rating - o1.rating;},
  },
  {
    key: SortingSelection.LowToHigh,
    value: 'Price: low to high',
    sortingFunction: function(o1: Offer, o2: Offer) {return o2.price - o1.price;},
  },
  {
    key: SortingSelection.HighToLow,
    value: 'Price: high to low',
    sortingFunction: function(o1: Offer, o2: Offer) {return o1.price - o2.price;},
  },
  {
    key: SortingSelection.TopRated,
    value: 'Top rated first',
    sortingFunction: function(o1: Offer, o2: Offer) {return o1.rating - o2.rating;},
  },
];

export function getOffersSortingFunction(sortingSelection: SortingSelection): OffersComparator {
  const selectedElement = sortingSelectionList.find( (s) => s.key === sortingSelection);
  return selectedElement ? selectedElement.sortingFunction : sortingSelectionList[0].sortingFunction;
}

function SortingMenu({sortingSelection, onChangeSorting}: ConnectedSortingMenuProps): JSX.Element {
  const sortingSelectionEnsured = sortingSelection === undefined ? SortingSelection.Popular : sortingSelection;
  const sortingCaption = sortingSelectionList.filter( (i) => (i.key === sortingSelectionEnsured) )[0].value;
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  //  places__options--opened
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption"
        onMouseEnter={ (e) => {setMenuOpened(true); } }
      >
        Sort by {sortingCaption}
      </span>
      <span className="places__sorting-type" tabIndex={0}>
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="/#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${menuOpened  ? 'places__options--opened' : ''}`} >
        {sortingSelectionList.map( (el) =>
          (
            <li key={el.key}
              className={`places__option places__option${sortingSelection === el.key ? '--active' : ''}`}
              tabIndex={0}
            >
              <a href="/#" onClick={ (ev) => {onChangeSorting(el.key); setMenuOpened(false);} }>
                {el.value}
              </a>
            </li>
          ),
        )}
      </ul>
    </form>
  );
}

export default connector(SortingMenu);
