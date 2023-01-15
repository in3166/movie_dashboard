import { ReactNode } from 'react';
import { cx } from 'styles';
import styles from './container.module.scss';

interface IContainerProps {
  children: ReactNode;
  color?: string;
  width?: string;
}
const Container = ({ children, color = 'white', width = 'lg' }: IContainerProps): JSX.Element => {
  return <div className={cx(styles.container, styles[`${color}`], styles[`${width}`])}>{children}</div>;
};

export default Container;
