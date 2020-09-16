import { enumToNameId } from '../utils/common-utils';
import { BaseModel } from './base.model';

export class Movie extends BaseModel {
  title: string;
  language: string;
  plot: string;
  poster: string;
  soundEffects: string[];
  stills: string[];
  imdbId: string;
  listingType: ListingType;
  imdbRating: number;
}

export enum ListingType {
  NOW_SHOWING,
  RELEASED,
  COMING_SOON,
}
export const ListingTypes = enumToNameId(ListingType); //for dropdown
