import React from 'react';

import styles from './AddPost.module.scss';
import * as yup from 'yup';
import { ErrorMessage, Field, Formik, FormikProps } from 'formik';
import { PostCreate } from '../../../interfaces';
import { useDispatch } from 'react-redux';
import { postsActions } from '../../../store/Posts';
import Button from '../../Button/Button';
import FormError from '../../FormError/FormError';

interface Props {
  setisAddPostOpen: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

let initialValues: PostCreate = {
  full_text: '',
  multimedia: null,
};

const validationSchema = yup.object({
  full_text: yup.string().required('Required').max(2200),
});

const AddPost = ({ setisAddPostOpen }: Props) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        let post = new FormData();

        if (values.multimedia === null) return;

        post.append('full_text', values.full_text as any);
        for (let i = 0; i < values.multimedia.length; i++) {
          post.append(`multimedia`, values.multimedia[i]);
        }

        console.log('@@post');
        console.log(post);

        dispatch(postsActions.createPost(post));
      }}
    >
      {({ handleSubmit, setFieldValue }: FormikProps<PostCreate>) => (
        <form className={styles.container} onSubmit={handleSubmit}>
          <div className={styles.close} onClick={setisAddPostOpen}>
            X
          </div>
          <Field
            name="full_text"
            placeholder="Post Text"
            className={styles.full_text}
          />
          <ErrorMessage
            component={FormError as React.FunctionComponent<{}>}
            name="full_text"
          />
          <Field name={'multimedia'}>
            {() => {
              return (
                <input
                  id="multimedia"
                  name="multimedia"
                  type="file"
                  multiple={true}
                  className={styles.multimedia}
                  onChange={(event) => {
                    setFieldValue('multimedia', event.target.files);
                  }}
                />
              );
            }}
          </Field>
          <ErrorMessage
            component={FormError as React.FunctionComponent<{}>}
            name="multimedia"
          />
          <Button type="submit">NEW POST</Button>
        </form>
      )}
    </Formik>
  );
};

export default AddPost;
