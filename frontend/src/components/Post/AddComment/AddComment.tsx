import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';

import { CreateCommentDTO } from '../../../interfaces';
import Button from '../../Button/Button';
import FormError from '../../FormError/FormError';
import styles from './AddComment.module.scss';

interface Props {}

const initialValues: CreateCommentDTO = {
  full_text: '',
};

const validationSchema = yup.object({
  full_text: yup
    .string()
    .max(300, 'Comment must be less than 300 characters')
    .required(''),
});

const AddComment = (props: Props) => {
  const onSubmit = async (values: CreateCommentDTO) => {};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className={styles.container}>
        <Field
          name="full_text"
          placeholder="Add a comment..."
          className={styles.field}
        />
        <ErrorMessage
          component={FormError as React.FunctionComponent<{}>}
          name="full_text"
        />
        <Button type="submit" variant="second">
          Post
        </Button>
      </Form>
    </Formik>
  );
};

export default AddComment;
