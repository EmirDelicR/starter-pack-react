import { FunctionComponent, PropsWithChildren } from 'react';

import styles from './Loader.module.scss';

export const Loader: FunctionComponent<PropsWithChildren<{ size?: number }>> = ({
  size = 100,
  children = null
}) => {
  let innerDivSize = size;

  if (size < 100) {
    innerDivSize = size / 4;
  }

  const renderLoaderContent = () => {
    if (size >= 100 && children) {
      return <span style={{ fontSize: '2rem' }}>{children}</span>;
    }

    if (size >= 100) {
      return <span>Loading...</span>;
    }
    return null;
  };
  return (
    <div className={styles.spinner} style={{ width: `${size}px`, height: `${size}px` }}>
      <div style={{ width: `${innerDivSize}px`, height: `${innerDivSize}px` }}></div>
      <div style={{ width: `${innerDivSize}px`, height: `${innerDivSize}px` }}></div>
      {renderLoaderContent()}
      <div style={{ width: `${innerDivSize}px`, height: `${innerDivSize}px` }}></div>
      <div style={{ width: `${innerDivSize}px`, height: `${innerDivSize}px` }}></div>
    </div>
  );
};
