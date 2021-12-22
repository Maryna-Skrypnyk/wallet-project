import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import moment from 'moment';
// import Box from '@material-ui/core/Box';

//redux
import { useDispatch, useSelector } from 'react-redux';
import transactionOperations from '../../redux/transactions/transaction-operations';
import transactionsSelectors from '../../redux/transactions/transaction-selectors';
import categorySelectors from '../../redux/categories/categories-selectors';
// import categoriesOperations from '../../redux/categories/categories-operations';

//components
import ButtonMain from '../ButtonMain';
import Switch from './Switch';
import Picker from './Picker/Picker';
import Spinner from '../Spinner';
import { ArrowDown } from '../IconBtn/ArrowDown';

// data
// import {
//   categories,
//   addIncomes,
// } from '../../assets/data/select-data/selectData';

//styles
import 'react-datepicker/dist/react-datepicker.css';
import styles from './TransactionForm.module.scss';
import customStyles from './CustomStyles/customStyles';

// registerLocale('ru', ru);

export default function TransactionForm({ onClose }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(transactionsSelectors.getLoading);
  const [chooseType, setChooseType] = useState(false);
  const [type, setType] = useState('-');
  const [category, setCategory] = useState({ value: null, label: '' });

  const allCategories = useSelector(categorySelectors.getAllCategories);
  // console.log('CATEG', allCategories);

  const allCategoriesCosts = allCategories.filter(
    category =>
      category !== 'Regular income' && category !== 'Irregular income',
  );

  const allCategoriesIncomes = allCategories.filter(
    category =>
      category === 'Regular income' || category === 'Irregular income',
  );

  const allCategoriesOptions = arr => {
    let options = [];
    arr.forEach(name => options.push({ value: name, label: name }));
    return options;
  };

  const handleChangeType = () => {
    setChooseType(!chooseType);
    // setType('+');

    if (!chooseType) {
      setType('+');
    } else {
      setType('-');
    }
  };

  console.log(type);

  // const dateMoment = moment(new Date()).format('DD.MM.YYYY');

  const handleClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const handleSubmitForm = (
    { type, money, category, date, month, year, comment },
    { resetForm },
  ) => {
    // let currentCategory = {};
    // if (type === '-') {
    //   currentCategory = categories.find(i => category === i.name);
    // } else {
    //   currentCategory = addIncomes.find(i => category === i.name);
    // }
    // console.log('FFFF', {
    //   type,
    //   category,
    //   money,
    //   date,
    //   comment,
    // });

    dispatch(
      transactionOperations.addTransactions({
        type,
        // category: currentCategory,
        category,
        money,
        date,
        month: date.slice(3, 5),
        year: date.slice(6),
        comment,
      }),
    );

    resetForm();
    onClose();
  };

  const validationsSchema = Yup.object().shape({
    type: Yup.string().required('type is required'),
    category: Yup.string().required('choose a category'),
    money: Yup.number('enter your sum')
      .min(0, 'sum must be positive')
      // .integer('sum must be an integer')
      .required('sum is required'),
    date: Yup.string(),
    comment: Yup.string('enter your comment').max(
      20,
      'no more than 20 characters',
    ),
  });

  return (
    <div className={styles.modal}>
      <div className={styles.containerForm}>
        <Formik
          initialValues={{
            type: !chooseType ? '-' : '+',
            category: category.value,
            money: '',
            date: moment(new Date()).format('DD.MM.YYYY'),
            comment: '',
          }}
          onSubmit={handleSubmitForm}
          validationSchema={validationsSchema}
          enableReinitialize
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className={styles.form}>
              <h3 className={styles.title}>Add transaction</h3>

              <Switch
                isChecked={chooseType}
                onSwitch={handleChangeType}
                value="type"
              />

              <div className={styles.categoryBox}>
                {chooseType && (
                  <div className={styles.containerInput}>
                    <Select
                      name="category"
                      onChange={setCategory}
                      label=""
                      placeholder="Choose category income"
                      options={allCategoriesOptions(allCategoriesIncomes)}
                      styles={customStyles}
                    />
                    <ArrowDown svg={styles.svgArrowDown} />
                    {errors.category && touched.category && (
                      <div className={styles.error}>
                        category income is required
                      </div>
                    )}
                  </div>
                )}

                {!chooseType && (
                  <div className={styles.containerInput}>
                    <Select
                      name="category"
                      onChange={setCategory}
                      label=""
                      placeholder="Choose category cost"
                      options={allCategoriesOptions(allCategoriesCosts)}
                      styles={customStyles}
                    />
                    <ArrowDown svg={styles.svgArrowDown} />
                    {errors.category && touched.category && (
                      <div className={styles.error}>
                        category cost is required
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className={styles.Credentials}>
                <div className={styles.BoxContainer}>
                  <Field
                    name="money"
                    type="number"
                    placeholder="0,00"
                    className={styles.Amount}
                  />
                  {errors.money && touched.money && (
                    <div className={styles.inputFeedback}>{errors.money}</div>
                  )}
                </div>

                <Picker
                  name="date"
                  onChange={date =>
                    setFieldValue(
                      'date',
                      (date = moment(date).format('DD.MM.YYYY')),
                    )
                  }
                />
              </div>

              {/* <Box className={styles.box_select}> */}
              <div className={styles.BoxContainerComment}>
                <Field
                  name="comment"
                  // as="textarea"
                  type="text"
                  placeholder="Comment"
                  className={styles.Comment}
                />
                {errors.comment && touched.comment && (
                  <div className={styles.inputFeedbackComment}>
                    {errors.comment}
                  </div>
                )}
              </div>
              {/* </Box> */}

              <ButtonMain type="submit" contentBtn="Add" button="Button" />

              <ButtonMain
                handleClick={handleClick}
                contentBtn="Cancel"
                button="ButtonSecondary"
              />

              {isLoading && <Spinner />}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
