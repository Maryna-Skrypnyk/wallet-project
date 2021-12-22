import { useState } from 'react';
import Select from 'react-select';
import { ArrowDown } from '../../IconBtn/ArrowDown';

import customStyles from './CustomStyles/customStyles';
import styles from './Period.module.scss';

const allMonths = [
  { name: 'All months', id: '0' },
  { name: 'January', id: '01' },
  { name: 'February', id: '02' },
  { name: 'March', id: '03' },
  { name: 'April', id: '04' },
  { name: 'May', id: '05' },
  { name: 'June', id: '06' },
  { name: 'July', id: '07' },
  { name: 'August', id: '08' },
  { name: 'September', id: '09' },
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
            placeholder={monthState}
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
            placeholder={yearState}
            styles={customStyles}
          />
          <ArrowDown svg={styles.svgArrowDown} />
        </div>
      </form>
    </>
  );
};

export default Period;
