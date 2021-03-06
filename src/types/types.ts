import {RootState} from '../store/reducer';

export type User = {
  // eslint-disable-next-line camelcase
  avatar_url: string,
  id: number,
  // eslint-disable-next-line camelcase
  is_pro: boolean,
  name: string,
}

export type AuthUser = {
  email: string,
  password: string,
}

export type Location = {
  latitude: number,
  longitude: number,
  zoom: number
};

export type City = {
  name: string,
}

export type CityWithLocation = City & {
  location: Location,
};

export type Offer = {
  id: number,
  title: string,
  type: string,
  city: CityWithLocation,
  location: Location,
  bedrooms: number,
  // eslint-disable-next-line camelcase
  max_adults: number,
  goods: string[],
  price: number,
  rating: number,
  host: User,
  images: string[],
  // eslint-disable-next-line camelcase
  preview_image: string,
  // eslint-disable-next-line camelcase
  is_favorite: boolean,
  // eslint-disable-next-line camelcase
  is_premium: boolean,
  description: string,
};

export type Comment = {
  comment: string,
  date: Date,
  id: number,
  rating: number,
  user: User
};

export type RawComment = Omit<Comment, 'date'> & { date: string };

export type CommentPost = {
  comment: string,
  rating: number
};

export type Point = Location & {
  title: string;
};

export type Points = Point[];

export enum SortingSelection {
  Popular,
  LowToHigh,
  HighToLow,
  TopRated
}

export type AuthInfo = {
  id: number,
  // eslint-disable-next-line camelcase
  avatar_url: string,
  email: string,
  // eslint-disable-next-line camelcase
  is_pro: boolean,
  name: string,
  token: string,
}

export type OfferDetails = {
  offer: Offer | undefined,
  comments: Comment[],
  nearPlaces: Offer[],
}

export type AuthState = {
  isAuthorized: boolean,
  currentUser: AuthInfo,
}

export type OffersState = {
  allCitiesNames: string[],
  allCitiesData: CityWithLocation[],
  allOffers: Offer[],
  city: CityWithLocation,
  cityOffers: Offer[],
  sortingSelection: SortingSelection,
  selectedPoint: Point | undefined,
  isDataLoaded: boolean,
}

export type DetailsState = {
  offerDetails: OfferDetails,
  review: Review,
}

export type FavoritesState = {
  favorites: Offer[],
}

export type State = RootState;

export enum OperationStatus {
  InProcess,
  Done
}

export type Review = CommentPost & {
  reviewSavingStatus: OperationStatus,
}

