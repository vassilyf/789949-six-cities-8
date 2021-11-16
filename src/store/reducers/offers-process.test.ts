import {OffersState, Point, SortingSelection} from '../../types/types';
import {ActionType} from '../../types/action';
import {OFFERS_INITIAL_STATE, offersProcess} from './offers-process';
import {TEST_AMSTERDAM_OFFERS} from '../../mocks/offers';
import {AMSTERDAM} from '../../mocks/cities';
import {OFFERS_FILLED_STATE} from '../../mocks/state';

describe('Reducer: offers', () => {
  it('set all offers, chosen city should be reset to Paris', () => {
    const state: OffersState = OFFERS_INITIAL_STATE;
    const setOffersAction = {
      type: ActionType.SetOffers,
      payload: OFFERS_FILLED_STATE.allOffers,
    };
    expect(offersProcess(state, setOffersAction))
      .toEqual({...OFFERS_FILLED_STATE});
  });

  it('select current city', () => {
    const state: OffersState = OFFERS_FILLED_STATE;
    const selectCityAction = {
      type: ActionType.SelectCity,
      payload: AMSTERDAM.name,
    };
    expect(offersProcess(state, selectCityAction))
      .toEqual({
        ...OFFERS_FILLED_STATE,
        city: AMSTERDAM,
        cityOffers: TEST_AMSTERDAM_OFFERS,
        isDataLoaded: true,
      });
  });

  it('select sorting order', () => {
    const state: OffersState = OFFERS_FILLED_STATE;
    const setSortingSelectionAction = {
      type: ActionType.SetSortingSelection,
      payload: SortingSelection.LowToHigh,
    };
    expect(offersProcess(state, setSortingSelectionAction))
      .toEqual({
        ...OFFERS_FILLED_STATE,
        sortingSelection: SortingSelection.LowToHigh,
      });
  });

  it('select selected point on the map', () => {
    const state: OffersState = OFFERS_FILLED_STATE;
    const point: Point = {
      latitude: 2.5,
      longitude: 6.7,
      zoom: 4,
      title: 'title string',
    };
    const setSelectedPointAction = {
      type: ActionType.SetSelectedPoint,
      payload: point,
    };
    expect(offersProcess(state, setSelectedPointAction))
      .toEqual({
        ...OFFERS_FILLED_STATE,
        selectedPoint: point,
      });
  });

  it('set or remove a bookmark on an offer', () => {
    const state: OffersState = OFFERS_FILLED_STATE;
    const favoriteHotel = OFFERS_FILLED_STATE.allOffers[0];
    expect(favoriteHotel.id).toEqual(5);
    const markFavoriteAction = {
      type: ActionType.MarkFavorite,
      payload: {hotelId: favoriteHotel.id, isFavorite: !favoriteHotel.is_favorite},
    };
    const newState = offersProcess(state, markFavoriteAction);
    expect(newState.allOffers[0].id).toEqual(5);
    expect(newState.allOffers[0].is_favorite).toEqual(!favoriteHotel.is_favorite);
    expect(newState.cityOffers[0].id).toEqual(5);
    expect(newState.cityOffers[0].is_favorite).toEqual(!favoriteHotel.is_favorite);
  });

});
