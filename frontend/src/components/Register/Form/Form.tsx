import React from 'react';
import { ErrorMessage, Field, Form as FormikForm, Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Form.module.scss';
import Button from '../../Button/Button';
import { ClientCreate, SessionPost } from '../../../interfaces';
import FormError from '../../FormError/FormError';
import { usersActions } from '../../../store/Users';

interface Props {
  className: string;
}

const initialValues: ClientCreate = {
  email: '',
  full_name: '',
  username: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup.string().email('Invalid Email').required('Required'),
  full_name: yup
    .string()
    .max(255, 'Full Name must be less than 255 character')
    .required('Required'),
  username: yup
    .string()
    .max(30, 'Username must be less than 30 characters')
    .required('Required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(255, 'Password must be less than 255 characters long')
    .required('Required'),
});

const Form = (props: Props) => {
  const dispatch = useDispatch();

  const error = useSelector(
    (state) => state.session.errors.CREATE_SESSION_REQUEST
  );

  async function onSubmit(values: SessionPost) {
    dispatch(usersActions.createUser(values));
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <FormikForm className={styles.container}>
          <h1 className={styles.field}>Instagram</h1>
          <p className={`${styles.cta} ${styles.field}`}>
            Sign up to see photos and videos from your friends.
          </p>
          <Field
            type="email"
            name="email"
            placeholder="Email"
            className={styles.field}
          />
          <ErrorMessage
            component={FormError as React.FunctionComponent<{}>}
            name="email"
          />
          <Field
            type="full_name"
            name="full_name"
            placeholder="Full Name"
            className={styles.field}
          />
          <ErrorMessage
            component={FormError as React.FunctionComponent<{}>}
            name="full_name"
          />
          <Field
            type="username"
            name="username"
            placeholder="Username"
            className={styles.field}
          />
          <ErrorMessage
            component={FormError as React.FunctionComponent<{}>}
            name="username"
          />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className={styles.field}
          />
          <ErrorMessage
            component={FormError as React.FunctionComponent<{}>}
            name="password"
          />
          <div className={styles.button_field}>
            <Button type="submit">Sign Up</Button>
          </div>

          <FormError>{error}</FormError>
        </FormikForm>
      </Formik>
    </>
  );
};

export default Form;