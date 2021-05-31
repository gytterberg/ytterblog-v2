import * as ActionTypes from './ActionTypes';

/// these are 'Reducers' for the blog posts
/// these connect action creators with action types

export const Posts = (
  state = { isLoading: true, errMess: null, posts: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_POST:
      /// non analogous fix this
      return {
        ...state,
        isLoading: false,
        errMess: null,
        post: action.payload,
      };

    case ActionTypes.ADD_POSTS:
      // load posts into state from DB
      return {
        ...state,
        isLoading: false,
        errMess: null,
        posts: action.payload,
      };

    case ActionTypes.EDIT_POST:
      // edit post
      return {
        ...state,
        isLoading: false,
        errMess: null,
        post: action.payload,
      };

    case ActionTypes.DELETE_POST:
      // delete post
      return { ...state, isLoading: false, errMess: null, posts: [] };

    case ActionTypes.POSTS_LOADING:
      // currently loading
      return { ...state, isLoading: true, errMess: null, posts: [] };

    case ActionTypes.POSTS_LOADING_FAILED:
      // failed to load posts, return an error message
      return { ...state, isLoading: false, errMess: action.payload, posts: [] };

    case ActionTypes.POST_CREATION_FAILED:
      // failed to create post
      return { ...state, isLoading: false, errMess: action.payload, posts: [] };

    case ActionTypes.POST_EDIT_FAILED:
      // failed to edit post
      return { ...state, isLoading: false, errMess: action.payload, post: [] };

    case ActionTypes.POST_DELETED:
      // deleted
      return {
        ...state,
        isLoading: false,
        errMess: null,
        post: action.payload,
      };

    case ActionTypes.POST_EDITED:
      // edited
      return {
        ...state,
        isLoading: false,
        errMess: null,
        post: action.payload,
      };

    case ActionTypes.POST_DELETE_FAILED:
      // delete failed
      return { ...state, isLoading: false, errMess: action.payload, post: [] };

    default:
      return state;
  }
};
