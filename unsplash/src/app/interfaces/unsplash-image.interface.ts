export interface UnsplashImage {
    id: string;
    description: string;
    urls: {
      small: string;
      regular: string;
      // TODO: size properties?
    };
    
  }