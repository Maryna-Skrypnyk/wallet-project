import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Period from '../Period';
import transactionsSelectors from '../../../redux/transactions/transaction-selectors';
import transactionOperations from '../../../redux/transactions/transaction-operations';

import styles from './Table.module.scss';

function Table() {
  const { categoriesSummary, totalSpend, totalIncome, uniqueYear } =
    useSelector(transactionsSelectors.getStatistics);

  const backgroundColor = [
    '#FED057',
    '#FCBEB1',
    '#FD9498',
    '#C5BAFF',
    '#6E78E8',
    '#4A56E2',
    '#81E1FF',
    '#24CCA7',
    '#00AD84',
  ];

  const years = uniqueYear || [];
  const date = new Date();
  const [month, setMonth] = useState(() => date.getUTCMonth() + 1);
  const [year, setYear] = useState(() => date.getFullYear());
  // const [year, setYear] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(transactionOperations.getStatistics({ year, month }));
  }, [dispatch, month, year]);

  const formatSum = sum => {
    return new Intl.NumberFormat('ua-UA', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(sum);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.selectContainer}>
        <Period
          setRequestedMonth={setMonth}
          setRequestedYear={setYear}
          years={years}
        />
      </div>

      <div className={styles.categoryContainer}>
        <ul className={styles.listTitle}>
          <li className={styles.listTitleText}>Category</li>
          <li className={styles.listTitleText}>Amount</li>
        </ul>

        <ul className={styles.listTransaction}>
          {categoriesSummary &&
            Object.keys(categoriesSummary).map((category, index) => {
              return (
                <li className={styles.elementTransaction} key={index}>
                  <div
                    style={{
                      backgroundColor: backgroundColor[index],
                      width: '24px',
                      minHeight: '24px',
                      borderRadius: '2px',
                      marginRight: '16px',
                    }}
                  ></div>
                  <div className={styles.category}>{category}</div>
                  <div className={styles.sum}>
                    {formatSum(categoriesSummary[category])}
                  </div>
                </li>
              );
            })}
        </ul>

        <ul className={styles.listTotal}>
          <li className={styles.itemTotal}>
            <div className={styles.itemText}>Expenses:</div>
            <div className={styles.itemTextSpend}>{formatSum(totalSpend)}</div>
          </li>
          <li className={styles.itemTotal}>
            <div className={styles.itemText}>Incomes:</div>
            <div className={styles.itemTextIncome}>
              {formatSum(totalIncome)}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Table;
