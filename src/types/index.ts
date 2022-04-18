export type TGenreStatic = string;

export type TGenre = {
  _id: string;
  name: string;
};

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
  genres: TGenreStatic[];
  mainPainting: TPainting | null;
};

export interface TArtist {
  _id: string;
  avatar: TImage;
  paintings: TPainting[];
  name: string;
  description: string;
  yearsOfLife: string;
  genres: TGenre[];
  mainPainting: TPainting | null;
}

export type TAuthBody = {
  username: string;
  password: string;
};

export type TArtistStaticRespone = TArtistStatic[];

export type TArtistResponse = TArtist;

export type TAuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type TRefreshBody = {
  refreshToken: string;
};

// Стор
export type TSettingsState = {
  theme: "dark" | "light";
  authorizationModal: "auth" | "register" | "";
  isConfirmRemoveModalOpen: boolean;
};

export type TGalleryState = {
  artistsStatic: TArtistStaticRespone | [];
  perPage: number;
};

export type TArtistState = {
  activeSlide: number;
  activePaintingId: TPainting["_id"];
  artist?: TArtistResponse;
  uploadedFile?: File;
};

export type TAuthState = {
  isAccess: boolean;
  isLoading: boolean;
  accessToken: string;
  refreshToken: string;
  expires: number;
  error: {
    type: "password" | "username" | "";
    message: string;
  };
};

export type TRootState = {
  settings: TSettingsState;
  gallery: TGalleryState;
  artist: TArtistState;
  auth: TAuthState;
};
