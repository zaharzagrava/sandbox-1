import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from 'yup';
import { ClientDTO, ClientUpdate } from '../../../interfaces';
import ClientImage from '../../ClientImage/ClientImage';
import FormError from '../../FormError/FormError';
import styles from './Edit.module.scss';
import { AppState } from '../../../store/typedef';
import { usersActions } from '../../../store/Users';
import Button from '../../Button/Button';

interface Props {}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  full_name: yup
    .string()
    .max(255, 'Full Name must be less than 255 character')
    .nullable(),
  username: yup
    .string()
    .required('Required')
    .max(30, 'Username must be less than 30 characters'),
  website: yup
    .string()
    .max(255, 'Website URL must be less than 255 characters')
    .url('Must be a valid URL')
    .nullable(),
  bio: yup.string().max(150, 'Bio must be less than 150 characters').nullable(),
  email: yup
    .string()
    .required('Required')
    .max(255, 'Email must be less than 255 characters')
    .email('Invalid email'),
  phone_number: yup
    .string()
    .max(255, 'Phone number must be less than 255 characters')
    .matches(phoneRegExp, 'Phone number is not valid')
    .nullable(),
  gender: yup
    .string()
    .max(255, 'Gender must be less than 150 characters')
    .nullable(),
});

const Edit = ({}: Props) => {
  const dispatch = useDispatch();
  const currUser = useSelector<AppState, ClientDTO>(
    (state) => state.session.user
  );

  const fileInput = useRef<HTMLInputElement>(null);

  let initialValues: ClientUpdate = {
    id: -1,
    full_name: currUser.full_name || '',
    username: currUser.username,
    website: currUser.website || '',
    bio: currUser.bio || '',
    email: currUser.email,
    phone_number: currUser.phone_number || '',
    gender: currUser.gender || '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        let user = new FormData();

        user.append('full_name', values.full_name as any);
        user.append('username', values.username as any);
        user.append('website', values.website as any);
        user.append('bio', values.bio as any);
        user.append('email', values.email as any);
        user.append('phone_number', values.phone_number as any);
        user.append('gender', values.gender as any);

        if (values.avatar) user.append(`avatar`, values.avatar);

        dispatch(usersActions.updateUser(user));
      }}
    >
      <Form className={styles.form}>
        <div className={styles.form_row}>
          <div className={styles.left_col}>
            <div className={styles.client_image}>
              <ClientImage src={currUser.avatar} />
            </div>
          </div>
          <div className={styles.right_col}>
            <h1 className={styles.username_header}>Username</h1>
            <Field name="avatar">
              {({ field, form }: FieldProps) => {
                return (
                  <input
                    style={{ display: 'none' }}
                    id="avatar"
                    name="avatar"
                    type="file"
                    ref={fileInput}
                    onChange={(event) => {
                      if (event.target.files) {
                        form.setFieldValue('avatar', event.target.files[0]);
                      }
                    }}
                  />
                );
              }}
            </Field>
            <a
              className={`${styles.sidenote} ${styles.change_avatar}`}
              onClick={() => {
                if (fileInput !== null && fileInput.current !== null) {
                  fileInput.current.click();
                }
              }}
            >
              Change Profile Photo
            </a>
          </div>
        </div>
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
                Help people discover your account by using the name you're known
                by: either your full name, nickname, or business name.
              </small>
            </p>
            <p className={styles.sidenote}>
              <small>You can only change your name twice within 14 days.</small>
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
                In most cases, you'll be able to change your username back to
                johnsmith92412 for another 14 days. <a href="">Learn More</a>
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
                Provide your personal information, even if the account is used
                for a business, a pet or something else. This won't be a part of
                your public profile.
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

        <div className={styles.submit_container}>
          <Button type="submit">UPDATE</Button>
        </div>
      </Form>
    </Formik>
  );
};

export default Edit;
