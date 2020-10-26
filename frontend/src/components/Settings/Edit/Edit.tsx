import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';

import * as yup from 'yup';
import { ClientDTO } from '../../../interfaces';
import ClientImage from '../../ClientImage/ClientImage';
import FormError from '../../FormError/FormError';
import styles from './Edit.module.scss';

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

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  full_name: yup.string().max(255, 'Full Name must be less than 255 character'),
  username: yup
    .string()
    .required('Required')
    .max(30, 'Username must be less than 30 characters'),
  website: yup
    .string()
    .max(255, 'Website URL must be less than 255 characters')
    .url('Must be a valid URL'),
  bio: yup.string().max(150, 'Bio must be less than 150 characters'),
  email: yup
    .string()
    .required('Required')
    .max(255, 'Email must be less than 255 characters')
    .email('Invalid email'),
  phone_number: yup
    .string()
    .max(255, 'Phone number must be less than 255 characters')
    .matches(phoneRegExp, 'Phone number is not valid'),
  gender: yup.string().max(255, 'Gender must be less than 150 characters'),
});

const Edit = (props: Props) => {
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
              <div className={styles.left_col}>Name</div>
              <div className={styles.right_col}>
                <Field name="full_name" placeholder="Name" />
                <ErrorMessage
                  component={FormError as React.FunctionComponent<{}>}
                  name="full_name"
                />
                <p className={styles.sidenote}>
                  <small>
                    Help people discover your account by using the name you're
                    known by: either your full name, nickname, or business name.
                  </small>
                </p>
                <p className={styles.sidenote}>
                  <small>
                    You can only change your name twice within 14 days.
                  </small>
                </p>
              </div>
            </div>
            <div className={styles.form_row}>
              <div className={styles.left_col}>Username</div>
              <div className={styles.right_col}>
                <Field name="username" placeholder="Username" />
                <ErrorMessage
                  component={FormError as React.FunctionComponent<{}>}
                  name="username"
                />
                <p className={styles.sidenote}>
                  <small>
                    In most cases, you'll be able to change your username back
                    to johnsmith92412 for another 14 days.{' '}
                    <a href="">Learn More</a>
                  </small>
                </p>
              </div>
            </div>
            <div className={styles.form_row}>
              <div className={styles.left_col}>Website</div>
              <div className={styles.right_col}>
                <Field name="website" placeholder="Website" />
                <ErrorMessage
                  component={FormError as React.FunctionComponent<{}>}
                  name="website"
                />
              </div>
            </div>
            <div className={styles.form_row}>
              <div className={styles.left_col}>Bio</div>
              <div className={styles.right_col}>
                <Field as="textarea" name="bio" placeholder="" />
                <ErrorMessage
                  component={FormError as React.FunctionComponent<{}>}
                  name="bio"
                />
                <p className={styles.sidenote}>
                  <b>Personal Information</b>
                </p>
                <p className={styles.sidenote}>
                  <small>
                    Provide your personal information, even if the account is
                    used for a business, a pet or something else. This won't be
                    a part of your public profile.
                  </small>
                </p>
              </div>
            </div>
            <div className={styles.form_row}>
              <div className={styles.left_col}>Email</div>
              <div className={styles.right_col}>
                <Field name="email" placeholder="Email" />
                <ErrorMessage
                  component={FormError as React.FunctionComponent<{}>}
                  name="email"
                />
              </div>
            </div>
            <div className={styles.form_row}>
              <div className={styles.left_col}>Phone Number</div>
              <div className={styles.right_col}>
                <Field name="phone_number" placeholder="Phone Number" />
                <ErrorMessage
                  component={FormError as React.FunctionComponent<{}>}
                  name="phone_number"
                />
              </div>
            </div>
            <div className={styles.form_row}>
              <div className={styles.left_col}>Gender</div>
              <div className={styles.right_col}>
                <Field name="gender" placeholder="Gender" />
                <ErrorMessage
                  component={FormError as React.FunctionComponent<{}>}
                  name="gender"
                />
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Edit;
