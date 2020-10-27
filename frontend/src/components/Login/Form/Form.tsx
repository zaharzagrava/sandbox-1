import React, { ReactElement } from 'react';
import { ErrorMessage, Field, Form as FormikForm, Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import styles from './Form.module.scss';
import { SessionPost } from '../../../interfaces';
import Button from '../../Button/Button';
import { sessionActions } from '../../../store/Session';
import FormError from '../../FormError/FormError';

interface Props {
  className: string;
}

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

const Form = (props: Props) => {
  const dispatch = useDispatch();

  async function onSubmit(values: SessionPost) {
    // dispatch(sessionActions.createSession(values));
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <FormikForm className={styles.container}>
          <h1>Instagram</h1>

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
          <Button type="submit">Log In</Button>
        </FormikForm>
      </Formik>
    </>
  );
};

export default Form;
