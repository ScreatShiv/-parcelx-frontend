export interface PageRequest {
  page: number;
  size: number;
  sortField?: string | null;
  sortOrder?: 1 | -1 | 0;
}

export interface PageResult<T> {
  items: T[];
  total: number;
}

