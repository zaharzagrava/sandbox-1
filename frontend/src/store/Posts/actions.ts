import { postsConstants } from '.';

export const postsActions = {
  /* Actions for both current and other posts */
  getPost: (id: number) => ({
    type: postsConstants.GET_POST_REQUEST,
    id,
  }),
  getPostSuccess: (post: any) => ({
    type: postsConstants.GET_POST_SUCCESS,
    post,
  }),
  getPostFailure: (error: any) => ({
    type: postsConstants.GET_POST_FAILURE,
    error,
  }),

  /* Get multiple posts */
  getPosts: (params?: any) => ({
    type: postsConstants.GET_POSTS_REQUEST,
    params,
  }),
  getPostsSuccess: (posts: any) => ({
    type: postsConstants.GET_POSTS_SUCCESS,
    posts,
  }),
  getPostsFailure: (error: any) => ({
    type: postsConstants.GET_POSTS_FAILURE,
    error,
  }),

  /* Only current post */
  createPost: (formData: any) => ({
    type: postsConstants.CREATE_POST_REQUEST,
    formData,
  }),
  createPostSuccess: (post: any) => ({
    type: postsConstants.CREATE_POST_SUCCESS,
    post,
  }),
  createPostFailure: (error: any) => ({
    type: postsConstants.CREATE_POST_FAILURE,
    error,
  }),

  updatePost: (id: number, post: any) => ({
    type: postsConstants.UPDATE_POST_REQUEST,
    id,
    post,
  }),
  updatePostSuccess: (post: any) => ({
    type: postsConstants.UPDATE_POST_SUCCESS,
    post,
  }),
  updatePostFailure: (error: any) => ({
    type: postsConstants.UPDATE_POST_FAILURE,
    error,
  }),

  destroyPost: (id: number) => ({
    type: postsConstants.DESTROY_POST_REQUEST,
    id,
  }),
  destroyPostSuccess: () => ({
    type: postsConstants.DESTROY_POST_SUCCESS,
  }),
  destroyPostFailure: (error: any) => ({
    type: postsConstants.DESTROY_POST_FAILURE,
    error,
  }),
};
