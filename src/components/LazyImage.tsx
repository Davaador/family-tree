import { Image } from 'antd';
import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: React.ReactNode;
  fallback?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder,
  fallback = '/logo192.png',
  className,
  style,
  width,
  height,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const defaultPlaceholder = (
    <div
      style={{
        width: width || '100%',
        height: height || '200px',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
      }}
    >
      <div>Loading...</div>
    </div>
  );

  return (
    <div ref={imgRef} className={className} style={style}>
      {!isInView ? (
        placeholder || defaultPlaceholder
      ) : (
        <Image
          src={hasError ? fallback : src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          placeholder={placeholder || defaultPlaceholder}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;
