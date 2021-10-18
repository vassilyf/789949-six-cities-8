
export type UserType = {
  // eslint-disable-next-line camelcase
  avatar_url: string,
  id: number,
  // eslint-disable-next-line camelcase
  is_pro: boolean,
  name: string,
}

export type LocationType = {
  latitude: number,
  longitude: number,
  zoom: number,
};

export type CityType = {
  location: LocationType,
  name: string
};

export type OfferType = {
  id: number,
  title: string,
  type: string,
  city: CityType,
  bedrooms: number,
  // eslint-disable-next-line camelcase
  max_adults: number,
  goods: string[],
  price: number,
  rating: number,
  host: UserType,
  images: string[],
  // eslint-disable-next-line camelcase
  preview_image: string,
  // eslint-disable-next-line camelcase
  is_favorite: boolean,
  // eslint-disable-next-line camelcase
  is_premium: boolean,
};

export type CommentType = {
  comment: string,
  date: Date,
  id: number,
  rating: number,
  user: UserType
};

