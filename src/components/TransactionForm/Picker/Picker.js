import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { addMonths } from 'date-fns';
import PropTypes from 'prop-types';
import ru from 'date-fns/locale/ru';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './Picker.module.scss';
import { Calendar } from '../../IconBtn/Calendar';

registerLocale('ru', ru);

const Picker = ({ onChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpenDate, setIsOpenDate] = useState(false);

  const handleChangeDate = e => {
    setIsOpenDate(!isOpenDate);
    setStartDate(e);
    onChange(e);
  };

  const handleClickDate = e => {
    e.preventDefault();
    setIsOpenDate(!isOpenDate);
  };

  return (
    <>
      <div className={styles.DateBox}>
        <DatePicker
          maxDate={addMonths(new Date(), 0)}
          showDisabledMonthNavigation
          selected={startDate}
          dateFormat="dd.MM.yyyy"
          className={styles.Date}
          name="date"
          open={false}
          locale="ru"
          onChange={handleChangeDate}
        />

        <button className={styles.BtnIconCalendar} onClick={handleClickDate}>
          <Calendar svg={styles.svgCalendar} />
        </button>

        {isOpenDate && (
          <div className={styles.datePicker}>
            <DatePicker
              maxDate={addMonths(new Date(), 0)}
              showDisabledMonthNavigation
              closeOnScroll={true}
              selected={startDate}
              onChange={handleChangeDate}
              locale="ru"
              inline
            />
          </div>
        )}
      </div>
    </>
  );
};

Picker.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Picker;
