import React from 'react';
import { ErrorMessage, Field, Form as FormikForm, Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Form.module.scss';
import { SessionPost } from '../../../interfaces';
import Button from '../../Button/Button';
import { sessionActions } from '../../../store/Session';
import FormError from '../../FormError/FormError';

interface Props {}

const initialValues: SessionPost = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup.string().email('Invalid Email').required('Required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(255, 'Password must be less than 255 characters long')
    .required('Required'),
});

const Form = ({}: Props) => {
  const dispatch = useDispatch();
  const error = useSelector(
    (state) => state.session.errors.CREATE_SESSION_REQUEST
  );

  async function onSubmit(values: SessionPost) {
    dispatch(sessionActions.createSession(values));
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
            <Button type="submit">Log In</Button>
          </div>

          <FormError>{error && error.message}</FormError>
        </FormikForm>
      </Formik>
    </>
  );
};

export default Form;
