import React from 'react';

interface TreeConnectorProps {
  type: 'vertical' | 'horizontal' | 'corner';
  className?: string;
}

const TreeConnector: React.FC<TreeConnectorProps> = ({
  type,
  className = '',
}) => {
  const getConnectorStyle = () => {
    switch (type) {
      case 'vertical':
        return 'w-0.5 h-8 bg-gradient-to-b from-gray-300 to-transparent';
      case 'horizontal':
        return 'h-0.5 w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent';
      case 'corner':
        return 'w-4 h-0.5 bg-gray-300';
      default:
        return '';
    }
  };

  return <div className={`${getConnectorStyle()} ${className}`} />;
};

export default TreeConnector;
