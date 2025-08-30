import { useState, useCallback, useMemo } from 'react';
import { PaginationParams } from '../types/common.types';

interface UseTableOptions {
  defaultPageSize?: number;
  defaultSortBy?: string;
  defaultSortOrder?: 'asc' | 'desc';
}

export function useTable(options: UseTableOptions = {}) {
  const {
    defaultPageSize = 10,
    defaultSortBy,
    defaultSortOrder = 'desc',
  } = options;

  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: defaultPageSize,
    sortBy: defaultSortBy,
    sortOrder: defaultSortOrder,
  });

  const [search, setSearch] = useState('');

  const handleTableChange = useCallback(
    (pagination: any, filters: any, sorter: any) => {
      setPagination((prev) => ({
        ...prev,
        page: pagination.current || 1,
        limit: pagination.pageSize || defaultPageSize,
        sortBy: sorter.field,
        sortOrder: sorter.order === 'ascend' ? 'asc' : 'desc',
      }));
    },
    [defaultPageSize]
  );

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const resetTable = useCallback(() => {
    setPagination({
      page: 1,
      limit: defaultPageSize,
      sortBy: defaultSortBy,
      sortOrder: defaultSortOrder,
    });
    setSearch('');
  }, [defaultPageSize, defaultSortBy, defaultSortOrder]);

  // Memoize the return object to prevent unnecessary re-renders
  const tableState = useMemo(
    () => ({
      pagination,
      search,
      handleTableChange,
      handleSearch,
      resetTable,
    }),
    [pagination, search, handleTableChange, handleSearch, resetTable]
  );

  return tableState;
}
