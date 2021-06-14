import * as ActionTypes from './ActionTypes';
import axios from 'axios';

// fetch posts ===============================###

// action creators

export const postsLoading = () => ({
  type: ActionTypes.POSTS_LOADING,
});

export const setPosts = (posts) => ({
  type: ActionTypes.SET_POSTS,
  payload: posts,
});

export const postsLoadingSuccess = () => ({
  type: ActionTypes.POSTS_LOADING_SUCCESS,
});

export const postsLoadingFailed = (error) => ({
  type: ActionTypes.POSTS_LOADING_FAILED,
  payload: error,
});

export const setPost = (post) => ({
  type: ActionTypes.SET_POST,
  payload: post,
});

export const insertNewPost = (post) => ({
  type: ActionTypes.NEW_POST,
  payload: post,
});

// thunk creators
export const fetchPosts = (/*pageSize, pageNum*/) => {
  // console.log('In fetchposts');
  const url = `/api/posts${
    typeof pageSize !== 'undefined' ? '?pageSize=' + pageSize : ''
  }${typeof pageNum !== 'undefined' ? '&pageNum=' + pageNum : ''}`;

  return async (dispatch) => {
    dispatch(postsLoading());

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    try {
      const postsData = (await axios.get(url)).data;
      console.log('#############');
      console.log(postsData);
      dispatch(setPosts(postsData));
    } catch (err) {
      dispatch(postsLoadingFailed(err.message));
      console.log(err);
    }
  };
};

export const fetchPost = (postId) => {
  return async (dispatch) => {
    try {
      const { data: post } = await axios.get(`/api/posts/${postId}`);
      dispatch(setPost(post));
    } catch (err) {
      console.log(err);
    }
  };
};

// post submission ===============================

// action creators
export const postCreationFailed = (error) => ({
  type: ActionTypes.POST_CREATION_FAILED,
  payload: error,
});

// thunk creators
export const submitPost = (newPost) => {
  return async (dispatch) => {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data: response } = await axios.post(
        '/api/posts/',
        newPost,
        config
      );
      dispatch(insertNewPost(response));
    } catch (err) {
      dispatch(postCreationFailed(err.message));
      console.log(err);
    }
  };
};

// edit ===============================

// action creators
export const postEdited = (post) => ({
  type: ActionTypes.POST_EDITED,
  payload: post,
});

export const postEditFailed = (error) => ({
  type: ActionTypes.POST_EDIT_FAILED,
  payload: error,
});

// thunk creators
export const editPost = (post) => {
  return async (dispatch) => {
    console.log('Edit post: ', JSON.stringify(post));

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data: response } = await axios.put(
        '/api/posts/' + post.id + '/',
        { title: post.title, body: post.body, user: post.user },
        config
      );
      dispatch(postEdited(response));
    } catch (err) {
      dispatch(postEditFailed(err.message));
      console.log(err);
    }
  };
};

// delete ===============================

export const postDeleted = (post) => ({
  type: ActionTypes.POST_DELETED,
  payload: post,
});

export const postDeleteFailed = (error) => ({
  type: ActionTypes.POST_DELETE_FAILED,
  payload: error,
});

// action creators

// thunk creators

export const deletePost = (postId) => {
  return async (dispatch) => {
    // delete the post
    console.log('Delete: ', postId);

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    try {
      const { data: success } = await axios.delete(
        '/api/posts/' + postId + '/'
      );
      dispatch(postDeleted(postId));
    } catch (err) {
      dispatch(postDeleteFailed(err.message));
    }
  };
};
