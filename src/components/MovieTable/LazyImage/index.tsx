import { useEffect, useRef, useState } from 'react';
import NoImage from 'assets/noImage.png';

interface ILazyImageProps {
  src: string;
  styles: string;
}

const LazyImage = ({ src, styles }: ILazyImageProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    observer.current = new IntersectionObserver(intersectionOberserver);
    imgRef.current && observer.current.observe(imgRef.current);
  }, []);

  const intersectionOberserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        setIsLoading(true);
      }
    });
  };

  return (
    <img width={77} height={90} ref={imgRef} src={isLoading ? src : NoImage} className={styles} alt='item poster' />
  );
};

export default LazyImage;
