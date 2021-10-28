
export type User = {
  // eslint-disable-next-line camelcase
  avatar_url: string,
  id: number,
  // eslint-disable-next-line camelcase
  is_pro: boolean,
  name: string,
}

export type Location = {
  latitude: number,
  longitude: number,
  zoom: number
};

export type City = {
  id: string,
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
};

export type Comment = {
  comment: string,
  date: Date,
  id: number,
  rating: number,
  user: User
};

export type Point = Location & {
  title: string;
};

export type Points = Point[];

export type State = {
  city: CityWithLocation,
  offers: Offer[]
};
