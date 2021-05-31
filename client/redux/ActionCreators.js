import * as ActionTypes from './ActionTypes';

// import axios from 'axios';

// post submission ===============================

export const submitPost = (newPost) => (dispatch) => {
  console.log(
    'Submit: title: ',
    newPost.title,
    ' body: ',
    newPost.body,
    ' user: ',
    newPost.user
  );

  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  axios
    .post('/api/posts/', newPost, config)
    .then((post) => dispatch(addPost(newPost)))
    .then(() => dispatch(fetchPosts()))
    .catch((err) => {
      dispatch(postCreationFailed(err.message));
      console.log(err);
    });
};

export const addPost = (post) => ({
  type: ActionTypes.ADD_POST,
  payload: post,
});

export const postCreationFailed = (errmess) => ({
  type: ActionTypes.POST_CREATION_FAILED,
  payload: errmess,
});

// edit ===============================

export const editPost = (post) => (dispatch) => {
  console.log('Edit post: ', JSON.stringify(post));

  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .put(
      '/api/posts/' + post.id + '/',
      { title: post.title, body: post.body, user: post.user },
      config
    )
    .then((post) => dispatch(postEdited(post)))
    .then(() => dispatch(fetchPosts()))
    .catch((err) => {
      dispatch(postEditFailed(err.message));
      console.log(err);
    });
};

export const postEdited = (post) => ({
  type: ActionTypes.POST_EDITED,
  payload: post,
});

export const postEditFailed = (errmess) => ({
  type: ActionTypes.POST_EDIT_FAILED,
  payload: errmess,
});

// delete ===============================

export const deletePost = (postId) => (dispatch) => {
  // delete the post
  console.log('Delete: ', postId);

  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  axios
    .delete('/api/posts/' + postId + '/')
    .then((post) => dispatch(postDeleted(post)))
    .then(() => dispatch(fetchPosts()))
    .catch((errmess) => dispatch(postDeleteFailed(errmess)));
};

export const postDeleted = (post) => ({
  type: ActionTypes.POST_DELETED,
  payload: post,
});

export const postDeleteFailed = (errmess) => ({
  type: ActionTypes.POST_DELETE_FAILED,
  payload: errmess,
});

// fetch posts ===============================###

export const fetchPosts = () => (dispatch) => {
  dispatch(postsLoading());

  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  axios
    .get('/api/posts/')
    .then((posts) => dispatch(addPosts(posts)))
    .catch((err) => {
      dispatch(postsLoadingFailed(err.message));
      console.log(err);
    });
};

export const postsLoading = () => ({
  type: ActionTypes.POSTS_LOADING,
});

export const addPosts = (posts) => ({
  type: ActionTypes.ADD_POSTS,
  payload: posts,
});

export const postsLoadingFailed = (errmess) => ({
  type: ActionTypes.POSTS_LOADING_FAILED,
  payload: errmess,
});
