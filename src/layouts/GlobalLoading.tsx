// components/GlobalLoading.tsx
import React from 'react';
import { Spin } from 'antd';
import { useLoadingStore } from 'context/auth/store';
import { LoadingOutlined } from '@ant-design/icons';

export const GlobalLoading: React.FC = () => {
  const loading = useLoadingStore((state) => state.loading);

  if (!loading) return null;
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 48, color: '#65eaae' }} spin />
  );

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <Spin indicator={antIcon} />
    </div>
  );
};
