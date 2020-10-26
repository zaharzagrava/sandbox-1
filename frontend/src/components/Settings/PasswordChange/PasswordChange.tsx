import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';

import * as yup from 'yup';
import { ClientDTO } from '../../../interfaces';
import ClientImage from '../../ClientImage/ClientImage';
import FormError from '../../FormError/FormError';
import styles from './PasswordChange.module.scss';

interface Props {}

let initialValues: ClientDTO = {
  // only to stop ts from throwing error
  id: -1,
  full_name: '',
  username: '',
  website: '',
  bio: '',
  email: '',
  phone_number: '',
  gender: '',
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

const PasswordChange = (props: Props) => {
  const onSubmit = () => {};

  return (
    <div>
      <div>
        <div className={styles.form_row}>
          <div className={styles.left_col}>
            <div className={styles.client_image}>
              <ClientImage />
            </div>
          </div>
          <div className={styles.right_col}>
            <h1 className={styles.username_header}>Username</h1>
            <a className={styles.sidenote}>Change Profile Photo</a>
          </div>
        </div>
      </div>
      <div className={styles.form}>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
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
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default PasswordChange;
