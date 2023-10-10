export class TableParamsDto {
  currentPage: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, string>;
  search?: string;
}

export class TableResultDto<T> {
  data: T[];
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}
