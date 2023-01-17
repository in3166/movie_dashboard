import { FC, useEffect, useRef, useState } from 'react';
import NoImage from 'assets/svgs/defaultMovie.png';
import styles from '../table.module.scss';

interface ILazyImage {
  src: string;
}

const LazyImage: FC<ILazyImage> = ({ src }): JSX.Element => {
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

  return <img ref={imgRef} src={isLoading ? src : NoImage} className={styles.poster} alt='item poster' />;
};

export default LazyImage;
