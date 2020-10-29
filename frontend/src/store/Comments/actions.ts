import { commentsConstants } from '.';

export const commentsActions = {
  /* Actions for both current and other comments */
  getComment: (id: number) => ({
    type: commentsConstants.GET_COMMENT_REQUEST,
    id,
  }),
  getCommentSuccess: (comment: any) => ({
    type: commentsConstants.GET_COMMENT_SUCCESS,
    comment,
  }),
  getCommentFailure: (error: any) => ({
    type: commentsConstants.GET_COMMENT_FAILURE,
    error,
  }),

  /* Get multiple comments */
  getComments: () => ({
    type: commentsConstants.GET_COMMENTS_REQUEST,
  }),
  getCommentsSuccess: (comments: any) => ({
    type: commentsConstants.GET_COMMENTS_SUCCESS,
    comments,
  }),
  getCommentsFailure: (error: any) => ({
    type: commentsConstants.GET_COMMENTS_FAILURE,
    error,
  }),

  /* Only current comment */
  createComment: (comment: any, post_id: number) => ({
    type: commentsConstants.CREATE_COMMENT_REQUEST,
    post_id,
    comment,
  }),
  createCommentSuccess: (comment: any) => ({
    type: commentsConstants.CREATE_COMMENT_SUCCESS,
    comment,
  }),
  createCommentFailure: (error: any) => ({
    type: commentsConstants.CREATE_COMMENT_FAILURE,
    error,
  }),

  updateComment: (id: number, comment: any) => ({
    type: commentsConstants.UPDATE_COMMENT_REQUEST,
    id,
    comment,
  }),
  updateCommentSuccess: (comment: any) => ({
    type: commentsConstants.UPDATE_COMMENT_SUCCESS,
    comment,
  }),
  updateCommentFailure: (error: any) => ({
    type: commentsConstants.UPDATE_COMMENT_FAILURE,
    error,
  }),

  destroyComment: (id: number) => ({
    type: commentsConstants.DESTROY_COMMENT_REQUEST,
    id,
  }),
  destroyCommentSuccess: () => ({
    type: commentsConstants.DESTROY_COMMENT_SUCCESS,
  }),
  destroyCommentFailure: (error: any) => ({
    type: commentsConstants.DESTROY_COMMENT_FAILURE,
    error,
  }),
};
