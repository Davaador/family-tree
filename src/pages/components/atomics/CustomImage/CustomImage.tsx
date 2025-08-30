import { Image } from 'antd';
import React, { useEffect, useState } from 'react';

interface CustomImageProps extends React.ComponentProps<typeof Image> {}

const CustomImage: React.FC<CustomImageProps> = ({ src, ...props }) => {
  const [image, setImage] = useState(
    'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=1024x1024&w=is&k=20&c=5aen6wD1rsiMZSaVeJ9BWM4GGh5LE_9h97haNpUQN5I='
  );

  useEffect(() => {
    let requestOnGoing = true;
    const abortController = new AbortController();
    const fetchImage = async () => {
      if (!src) {
        setImage(
          'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=1024x1024&w=is&k=20&c=5aen6wD1rsiMZSaVeJ9BWM4GGh5LE_9h97haNpUQN5I='
        );
        return;
      }
      try {
        setImage(src);
      } catch (e) {
      } finally {
        requestOnGoing = false;
      }
    };
    fetchImage();
    return () => {
      if (requestOnGoing) {
        abortController.abort();
      }
    };
  }, [src]);

  return <Image {...props} src={image} />;
};

export default CustomImage;
