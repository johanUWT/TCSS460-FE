/**
 * Interface for book ratings
 * Includes the average rating, count, and individual star counts
 */
export interface IRatings {
  average: number;
  count: number;
  rating_1: number;
  rating_2: number;
  rating_3: number;
  rating_4: number;
  rating_5: number;
}

/**
 * Interface for book icon URLs
 * Includes URLs for large and small book icons/images
 */
export interface IUrlIcon {
  large: string;
  small: string;
}

/**
 * Interface for book data
 * Defines the structure for book objects in HTTP responses
 */
export interface IBook {
  id: number;
  isbn13: number;
  authors: string;
  publication: number; // Publication year
  original_title: string;
  title: string;
  ratings: IRatings;
  icons: IUrlIcon;
}
