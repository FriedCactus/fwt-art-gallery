export type TGenre = string;

export type TImage = {
  _id: string;
  src: string;
  webp: string;
  src2x: string;
  webp2x: string;
  original: string;
};

export type TPainting = {
  _id: string;
  name: string;
  yearOfCreation: string;
  artist?: string;
  image: TImage;
};

export type TArtistStatic = {
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  genres: TGenre[];
  mainPainting: TPainting;
};

// Стор
export type TSettingsState = {
  theme: "dark" | "light";
  authorizationModal: "auth" | "register" | "";
};

export type TGalleryState = {
  artistsStatic: TArtistStatic[] | [];
  artistPaintings: TPainting[] | [];
  perPage: number;
};

export type TArtistState = {
  activeSlide: number;
};

export type TRootState = {
  settings: TSettingsState;
  gallery: TGalleryState;
  artist: TArtistState;
};

export type TAuthBody = {
  username: string;
  password: string;
};

export type TAuthResponse = {
  accessToken: string;
  refreshToken: string;
};
