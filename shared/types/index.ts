export interface Activity {
  _id: string;
  title: string;
  price: number;
  currency: string;
  rating: number;
  specialOffer: boolean;
  supplierId: string;
  supplier?: Supplier | null;
}
export interface Supplier {
  _id: string;
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
  page?: number;
  pageSize?: number;
}
export interface ErrorResponse {
  message: string;
  error?: string;
}
export interface FetchActivitiesParams {
  activityIds?: string[];
  rating?: number;
  specialOffer?: boolean;
  priceRange?: [number, number];
  q?: string;
  page?: number;
  pageSize?: number;
}
export interface SearchQuery {
  q?: string;
  rating?: number;
  specialOffer?: boolean;
  activityIds?: number[];
  priceRange?: number[];
}
export interface Pagination {
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  totalItems?: number;
}
export interface JSONResponse<T> {
  result: T;
  metadata?: {
    timestamp?: string; // ISO 8601 format
    pagination?: Pagination;
  };
  error?: ErrorResponse | null;
}
