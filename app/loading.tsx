'use client';

import { useEffect, useState } from 'react';
import styles from './loading.module.css';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;
    let frame: number;

    const animate = () => {
      if (value < 60) {
        value += 4;
      } else if (value < 90) {
        value += 1;
      } else if (value < 95) {
        value += 0.3;
      } else {
        value = 95;
      }

      setProgress(Math.floor(value));

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.loader}>
        <div className={styles.ring}></div>
        <div className={styles.text}>{progress}%</div>
      </div>
    </div>
  );
}
