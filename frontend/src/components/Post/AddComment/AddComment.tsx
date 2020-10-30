import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { CommentCreate } from '../../../interfaces';
import { commentsActions } from '../../../store/Comments';
import Button from '../../Button/Button';
import FormError from '../../FormError/FormError';
import styles from './AddComment.module.scss';

interface Props {
  post_id: number;
}

const initialValues: CommentCreate = {
  full_text: '',
};

const validationSchema = yup.object({
  full_text: yup
    .string()
    .max(300, 'Comment must be less than 300 characters')
    .required(''),
});

const AddComment = ({ post_id }: Props) => {
  const dispatch = useDispatch();

  async function onSubmit(values: CommentCreate) {
    dispatch(commentsActions.createComment(values, post_id));
  }

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
