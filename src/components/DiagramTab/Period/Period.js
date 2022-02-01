import { useState } from 'react';
import Select from 'react-select';
import { ArrowDown } from '../../IconBtn/ArrowDown';

import customStyles from './CustomStyles/customStyles';
import styles from './Period.module.scss';

const allMonths = [
  { name: 'All months', id: '0' },
  { name: 'January', id: '1' },
  { name: 'February', id: '2' },
  { name: 'March', id: '3' },
  { name: 'April', id: '4' },
  { name: 'May', id: '5' },
  { name: 'June', id: '6' },
  { name: 'July', id: '7' },
  { name: 'August', id: '8' },
  { name: 'September', id: '9' },
  { name: 'October', id: '10' },
  { name: 'November', id: '11' },
  { name: 'December', id: '12' },
];

const Period = ({ setRequestedMonth, setRequestedYear, years }) => {
  const date = new Date();
  const [monthState, setMonthState] = useState(
    () => allMonths[date.getUTCMonth() + 1].name,
  );
  const [yearState, setYearState] = useState(() => date.getFullYear());

  console.log({ monthState, yearState });

  const allYears = () => {
    const yearsArr = ['Year', ...years];
    let newYearsArr = [];

    yearsArr.map(year =>
      newYearsArr.push({ name: year, id: yearsArr.indexOf(year) }),
    );
    return newYearsArr;
  };

  const validateMonth = e => {
    const { value, label } = e;
    const monthId = value;
    setMonthState(label);

    if (monthId === '0') {
      setRequestedMonth('');
      return;
    }
    setRequestedMonth(monthId);
  };

  const validateYears = e => {
    const { label } = e;
    if (label === 'Year') {
      return;
    }
    setRequestedYear(label);
    setYearState(label);
  };

  const sortMonth = arr => {
    let optionsMonth = [];
    arr.forEach(({ id, name }) =>
      optionsMonth.push({
        value: id,
        label: name,
      }),
    );

    return optionsMonth;
  };

  const sortYears = arr => {
    let optionsYears = [];
    arr.forEach(({ id, name }) =>
      optionsYears.push({
        value: id,
        label: name,
      }),
    );
    return optionsYears;
  };

  return (
    <>
      <form className={styles.form}>
        <div className={styles.inputWrapperMonth}>
          <Select
            defaultValue="Month"
            name="SelectedMonth"
            onChange={validateMonth}
            options={sortMonth(allMonths)}
            // placeholder={monthState}
            placeholder="Month"
            styles={customStyles}
          />
          <ArrowDown svg={styles.svgArrowDown} />
        </div>

        <div className={styles.inputWrapperYear}>
          <Select
            defaultValue="Year"
            name="SelectedYear"
            onChange={validateYears}
            options={sortYears(allYears())}
            // placeholder={yearState}
            placeholder="Year"
            styles={customStyles}
          />
          <ArrowDown svg={styles.svgArrowDown} />
        </div>
      </form>
    </>
  );
};

export default Period;
