import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import transactionOperations from '../../../redux/transactions/transaction-operations';
import transactionsSelectors from '../../../redux/transactions/transaction-selectors';
import authSelectors from '../../../redux/auth/auth-selectors';
import { LoginImgPage } from '../../IconBtn/LoginImgPage';
import styles from './HomeTabMobile.module.scss';

export default function HomeTabMobile() {
  const dispatch = useDispatch();
  const token = useSelector(authSelectors.getToken);
  const array = useSelector(transactionsSelectors.getTransactions);
  const arr = Array.from(array);

  useEffect(() => {
    dispatch(transactionOperations.getTransactions({ token }));
  }, [dispatch, token]);

  arr.sort((a, b) => {
    const aDate = a.date.split('.');
    const bDate = b.date.split('.');

    const aDateA = aDate[2] * 360 + aDate[1] * 30 + aDate[0];
    const bDateB = bDate[2] * 360 + bDate[1] * 30 + bDate[0];

    if (aDateA > bDateB) {
      return -1;
    }
    if (aDateA < bDateB) {
      return 1;
    }
    return -1;
  });

  const formatSum = sum => {
    return new Intl.NumberFormat('ua-UA', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(sum);
  };

  return (
    <>
      {arr.length === 0 && (
        <div className={styles.containerSvg}>
          <LoginImgPage svg={styles.svg} />
        </div>
      )}
      {arr &&
        arr.map(({ _id, type, date, money, category, comment, balance }) => {
          const borderColor = type === '-' ? '#ff6596' : '#24cca7';
          return (
            <ul
              key={_id}
              className={
                type === '+' ? styles.mobileListPlus : styles.mobileList
              }
              style={{ borderColor: borderColor }}
            >
              <li className={styles.mobileListItem}>
                <span className={styles.mobileListCategory}>Date</span>
                <span className={styles.mobileListData}>{date}</span>
              </li>
              <li className={styles.mobileListItem}>
                <span className={styles.mobileListCategory}>Type</span>
                <span className={styles.mobileListData}>{type}</span>
              </li>
              <li className={styles.mobileListItem}>
                <span className={styles.mobileListCategory}>Category</span>
                <span className={styles.mobileListData}>{category}</span>
              </li>
              <li className={styles.mobileListItem}>
                <span className={styles.mobileListCategory}>Comment</span>
                <span className={styles.mobileListData}>{comment}</span>
              </li>
              <li className={styles.mobileListItem}>
                <span className={styles.mobileListCategory}>Sum</span>
                <span
                  className={
                    type === '+'
                      ? styles.mobileListDataPlus
                      : styles.mobileListDataMinus
                  }
                  style={{ borderColor: borderColor }}
                >
                  {formatSum(money)}
                </span>
              </li>
              <li className={styles.mobileListItem}>
                <span className={styles.mobileListCategory}>Balance</span>
                <span className={styles.mobileListData}>
                  {formatSum(balance)}
                </span>
              </li>
            </ul>
          );
        })}
    </>
  );
}
