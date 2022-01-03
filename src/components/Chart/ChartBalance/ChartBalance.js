import React from 'react';
import { useSelector } from 'react-redux';
import authSelectors from '../../../redux/auth/auth-selectors';

import styles from './ChartBalance.module.scss';

export default function ChartBalance() {
  const balance = useSelector(authSelectors.getFormatBalance);

  return (
    <>
      <div>
        <p className={styles.balance}>&#8372; {balance}</p>
      </div>
    </>
  );
}
