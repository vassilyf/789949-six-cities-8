import {ThunkActionResult} from '../types/action';
import {APIRoute} from '../const';
import {selectCity, setOffers} from './action';
import {Offer} from '../types/types';
import {PARIS} from '../mocks/cities';


export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffers(data));
    dispatch(selectCity(PARIS.name));
  };
