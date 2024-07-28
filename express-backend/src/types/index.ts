export interface Activity {
  id: number;
  title: string;
  price: number;
  currency: string;
  rating: number;
  specialOffer: boolean;
  supplierId: number;
  supplier?: Supplier;
}
export interface Supplier {
  id: number;
  name: string;
  address: string;
  zip: string;
  city: string;
  country: string;
}
export interface ActivityFilter {
  selectedRating: number | string;
  specialOffer: boolean;
  price: number;
}
export interface ErrorResponse {
  message: string;
  error?: string;
}
export interface FetchActivitiesParams {
  activityIds?: number[];
  rating?: number;
  specialOffer?: boolean;
  priceRange?: [number, number];
  q?: string;
  // TODO: Add pagination properties
  // page?: number;
  // limit?: number;
}
