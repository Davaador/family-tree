import React from 'react';

interface TreeConnectorProps {
  type: 'vertical' | 'horizontal' | 'corner';
  className?: string;
}

const TreeConnector: React.FC<TreeConnectorProps> = ({ type, className }) => {
  const getConnectorStyles = () => {
    const baseStyles = 'absolute border-gray-300';

    switch (type) {
      case 'vertical':
        return `${baseStyles} w-0 border-l-2`;
      case 'horizontal':
        return `${baseStyles} h-0 border-t-2`;
      case 'corner':
        return `${baseStyles} border-l-2 border-t-2`;
      default:
        return baseStyles;
    }
  };

  return <div className={`${getConnectorStyles()} ${className || ''}`} />;
};

export default TreeConnector;
