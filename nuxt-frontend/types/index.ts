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
  searchQuery: string;
  selectedRating: number | string;
  specialOffer: boolean;
  price: number;
}
export interface ErrorResponse {
  message: string;
  error?: string;
}
export interface SearchQuery {
  q?: string;
  rating?: number;
  specialOffer?: boolean;
  activityIds?: number[];
  priceRange?: number[];
}
