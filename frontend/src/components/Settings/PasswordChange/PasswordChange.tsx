import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';
import { ClientUpdatePassword } from '../../../interfaces';
import { usersActions } from '../../../store/Users';
import Button from '../../Button/Button';
import FormError from '../../FormError/FormError';
import styles from './PasswordChange.module.scss';

interface Props {}

let initialValues: ClientUpdatePassword = {
  old_password: '',
  new_password: '',
  confirm_new_password: '',
};

const validationSchema = yup.object({
  old_password: yup
    .string()
    .max(255, 'Full Name must be less than 255 character'),
  new_password: yup
    .string()
    .required('Required')
    .max(255, 'New password must be less than 255 characters'),
  confirm_new_password: yup
    .string()
    .max(255, 'New password must be less than 255 characters')
    .when('new_password', (new_password: string, schema: any) => {
      return schema.test({
        test: (confirm_new_password: string) =>
          new_password === confirm_new_password,
        message: 'Must equal to New Password',
      });
    }),
});

const PasswordChange = ({}: Props) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        dispatch(
          usersActions.updateUserPassword({
            new_password: values.new_password,
            old_password: values.old_password,
          })
        );
      }}
    >
      <Form className={styles.form}>
        <div className={styles.form_row}>
          <div className={styles.left_col}>Old Password</div>
          <div className={styles.right_col}>
            <Field
              type="password"
              name="old_password"
              placeholder="Old Password"
            />
            <ErrorMessage
              component={FormError as React.FunctionComponent<{}>}
              name="old_password"
            />
          </div>
        </div>
        <div className={styles.form_row}>
          <div className={styles.left_col}>New Password</div>
          <div className={styles.right_col}>
            <Field
              type="password"
              name="new_password"
              placeholder="New Password"
            />
            <ErrorMessage
              component={FormError as React.FunctionComponent<{}>}
              name="new_password"
            />
          </div>
        </div>
        <div className={styles.form_row}>
          <div className={styles.left_col}>Confirm New Password</div>
          <div className={styles.right_col}>
            <Field
              type="password"
              name="confirm_new_password"
              placeholder="Cofirm New Password"
            />
            <ErrorMessage
              component={FormError as React.FunctionComponent<{}>}
              name="confirm_new_password"
            />
          </div>
        </div>
        <div className={styles.submit}>
          <Button type="submit">CHANGE PASSWORD</Button>
        </div>
      </Form>
    </Formik>
  );
};

export default PasswordChange;
