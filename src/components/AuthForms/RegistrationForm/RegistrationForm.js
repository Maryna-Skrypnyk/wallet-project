import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authOperations from '../../../redux/auth/auth-operations';
import authSelectors from '../../../redux/auth/auth-selectors';
import { Formik, Form } from 'formik';
import PasswordStrenghtMeter from './PasswordStrenghtMeter';
import TextFieldForm from '../TextFieldForm';
import * as Yup from 'yup';
import Spinner from '../../Spinner';

import ButtonMain from '../../ButtonMain';
import { ReactComponent as IconEmail } from '../../../assets/icons/email.svg';
import { ReactComponent as IconLock } from '../../../assets/icons/lock.svg';
import { ReactComponent as IconName } from '../../../assets/icons/user.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './RegistrationForm.module.scss';

export default function RegistrationForm() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const isLoading = useSelector(authSelectors.getLoading);

  const validationsSchema = Yup.object().shape({
    email: Yup.string('enter your email')
      .email('enter a valid email')
      .required('is required'),
    password: Yup.string('enter your password')
      .min(6, 'at least 6 charaters')
      .max(12, 'maximum 12 characters')
      .required('is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'passwords are not the same')
      .required('is required'),
    name: Yup.string()
      .typeError()
      .min(1, 'at least 1 charater')
      .max(12, 'maximum 12 characters')
      .required('is required'),
  });

  const handleSubmit = ({ email, password, name }) => {
    // e.preventDefault();
    dispatch(
      authOperations.register({
        email,
        password,
        name,
      }),
    );

    // history.push('/login');
    goToLoginPage();
  };

  const goToLoginPage = () => navigate('login', { replace: true });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
      }}
      validateOnBlur
      onSubmit={handleSubmit}
      validationSchema={validationsSchema}
    >
      {({ handleChange, handleBlur, values, isValid, dirty }) => (
        <Form className={styles.Form}>
          <TextFieldForm
            label={<IconEmail width={24} height={24} />}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            name="email"
            type="email"
            placeholder="E-mail"
            className={styles.Field}
            id="email"
          />
          <TextFieldForm
            label={<IconLock width={24} height={24} />}
            name="password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            placeholder="Password"
            className={styles.Field}
            id="password"
            onInput={e => setPassword(e.target.value)}
          />
          <TextFieldForm
            label={<IconLock width={24} height={24} />}
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            placeholder="Confirm password"
            className={styles.Field}
          />

          <PasswordStrenghtMeter password={password} />

          <TextFieldForm
            label={<IconName width={24} height={24} />}
            name="name"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            placeholder="Your name"
            className={styles.Field}
            id="name"
          />

          <ButtonMain
            type="submit"
            contentBtn="Sign up"
            button="Button"
            disabled={!isValid && !dirty}
            onClick={handleSubmit}
          />

          {isLoading && <Spinner />}
        </Form>
      )}
    </Formik>
  );
}
