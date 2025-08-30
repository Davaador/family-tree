import { useState, useCallback, useRef } from 'react';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { ApiError } from '../types/api.types';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  showNotification?: boolean;
}

export function useApi<T = any>(options: UseApiOptions<T> = {}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const { t } = useTranslation();

  // Use ref to store latest options to avoid dependency issues
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const execute = useCallback(
    async (apiCall: () => Promise<T>) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiCall();
        setData(result);

        if (optionsRef.current.onSuccess) {
          optionsRef.current.onSuccess(result);
        }

        return result;
      } catch (err: any) {
        const apiError: ApiError = {
          message: err?.message || 'An error occurred',
          response: err?.response,
        };

        setError(apiError);

        if (optionsRef.current.onError) {
          optionsRef.current.onError(apiError);
        }

        if (optionsRef.current.showNotification !== false) {
          notification.error({
            message: t('admin.error.title'),
            description: apiError.message,
          });
        }

        throw apiError;
      } finally {
        setLoading(false);
      }
    },
    [t] // Only depend on t, not options
  );

  return {
    loading,
    data,
    error,
    execute,
  };
}
