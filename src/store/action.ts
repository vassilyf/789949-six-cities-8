import {
  ActionType,
  SelectCityAction,
  SetOffersAction,
  SetSelectedPointAction,
  SetSortingSelectionAction
} from '../types/action';
import {City, Offer, Point, SortingSelection} from '../types/types';

export const selectCity = (city: City): SelectCityAction => ({
  type: ActionType.SelectCity,
  payload: city,
});

export const setOffers = (offers: Offer[]): SetOffersAction => ({
  type: ActionType.SetOffers,
  payload: offers,
});

export const setSortingSelection = (selection: SortingSelection): SetSortingSelectionAction => ({
  type: ActionType.SetSortingSelection,
  payload: selection,
});

export const setSelectedPoint = (selection: Point | undefined): SetSelectedPointAction => ({
  type: ActionType.SetSelectedPoint,
  payload: selection,
});
