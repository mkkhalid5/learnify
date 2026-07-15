export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFormValues {
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface CategoryFilters {
  search: string;
  page: number;
  limit: number;
}