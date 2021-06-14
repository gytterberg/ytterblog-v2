import * as ActionTypes from './ActionTypes';

/// these are 'Reducers' for the blog posts
/// these connect action creators with action types

const PostsStatusReducer = (
  state = {
    loading: false,
    error: null,
    pageCount: null,
    pageSize: null,
    currentPage: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_POST:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case ActionTypes.SET_POSTS:
      // load posts into state from DB
      return {
        ...state,
        loading: false,
        error: null,
        pageCount: action.payload.pageCount,
        pageSize: action.payload.pageSize,
        currentPage: action.payload.currentPage,
      };

    case ActionTypes.POSTS_LOADING:
      // currently loading
      return { ...state, loading: true, error: null };

    case ActionTypes.POSTS_LOADING_FAILED:
      // failed to load posts, return an error message
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.POST_CREATION_FAILED:
      // failed to create post
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.POST_EDIT_FAILED:
      // failed to edit post
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.POST_DELETED:
      // deleted
      return {
        ...state,
        loading: false,
        error: null,
      };

    case ActionTypes.POST_EDITED:
      // edited
      return {
        ...state,
        loading: false,
        error: null,
      };

    case ActionTypes.POST_DELETE_FAILED:
      // delete failed
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default PostsStatusReducer;
