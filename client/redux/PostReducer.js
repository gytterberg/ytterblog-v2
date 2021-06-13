import * as ActionTypes from './ActionTypes';

/// these are 'Reducers' for the blog posts
/// these connect action creators with action types

const PostsReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_POST:
      // should be called set post
      return action.payload;

    case ActionTypes.POST_EDITED:
      // edit post
      return action.payload;

    // case ActionTypes.DELETE_POST:
    //   // delete post
    //   return { ...state, loading: false, errMess: null, posts: [] };

    // case ActionTypes.POSTS_LOADING:
    //   // currently loading
    //   return { ...state, loading: true, errMess: null, posts: [] };

    // case ActionTypes.POSTS_LOADING_FAILED:
    //   // failed to load posts, return an error message
    //   return { ...state, loading: false, errMess: action.payload, posts: [] };

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
