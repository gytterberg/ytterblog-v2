import * as ActionTypes from './ActionTypes';

/// these are 'Reducers' for the blog posts
/// these connect action creators with action types

const PostsReducer = (state = { loading: false, errMess: null }, action) => {
  switch (action.type) {
    // case ActionTypes.ADD_POST:
    //   /// non analogous fix this
    //   return {
    //     ...state,
    //     loading: false,
    //     errMess: null,
    //     post: action.payload,
    //   };

    // case ActionTypes.ADD_POSTS:
    //   // load posts into state from DB
    //   return {
    //     ...state,
    //     posts: action.payload,
    //   };

    // case ActionTypes.EDIT_POST:
    //   // edit post
    //   return {
    //     ...state,
    //     loading: false,
    //     errMess: null,
    //     post: action.payload,
    //   };

    // case ActionTypes.DELETE_POST:
    //   // delete post
    //   return { ...state, loading: false, errMess: null, posts: [] };

    case ActionTypes.POSTS_LOADING:
      // currently loading
      return { ...state, loading: true, errMess: null };

    case ActionTypes.POSTS_LOADING_FAILED:
      // failed to load posts, return an error message
      return { ...state, loading: false, errMess: action.payload };

    // case ActionTypes.POST_CREATION_FAILED:
    //   // failed to create post
    //   return { ...state, loading: false, errMess: action.payload, posts: [] };

    // case ActionTypes.POST_EDIT_FAILED:
    //   // failed to edit post
    //   return { ...state, loading: false, errMess: action.payload, post: [] };

    // case ActionTypes.POST_DELETED:
    //   // deleted
    //   return {
    //     ...state,
    //     loading: false,
    //     errMess: null,
    //     post: action.payload,
    //   };

    // case ActionTypes.POST_EDITED:
    //   // edited
    //   return {
    //     ...state,
    //     loading: false,
    //     errMess: null,
    //     post: action.payload,
    //   };

    // case ActionTypes.POST_DELETE_FAILED:
    //   // delete failed
    //   return { ...state, loading: false, errMess: action.payload, post: [] };

    default:
      return state;
  }
};

export default PostsReducer;