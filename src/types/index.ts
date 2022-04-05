export type TGenre = string;

export type TPainting = {
  _id: string;
  name: string;
  yearOfCreation: string;
  artist: string;
  image: {
    _id: string;
    src: string;
    webp: string;
    src2x: string;
    webp2x: string;
    original: string;
  };
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
export type TThemeState = {
  theme: "dark" | "light";
};

export type TGalleryState = {
  artistsStatic: TArtistStatic[] | [];
};

export type TRootState = {
  theme: TThemeState;
  gallery: TGalleryState;
};
