import * as ActionTypes from './ActionTypes';

// post submission ===============================

// action creators
export const addPost = (post) => ({
  type: ActionTypes.ADD_POST,
  payload: post,
});

export const postCreationFailed = (errmess) => ({
  type: ActionTypes.POST_CREATION_FAILED,
  payload: errmess,
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
      dispatch(addPost(response));
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

export const postEditFailed = (errmess) => ({
  type: ActionTypes.POST_EDIT_FAILED,
  payload: errmess,
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

export const postDeleteFailed = (errmess) => ({
  type: ActionTypes.POST_DELETE_FAILED,
  payload: errmess,
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

// fetch posts ===============================###

// action creators

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

// thunk creators
export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(postsLoading());

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    try {
      const { data: posts } = await axios.get('/api/posts/');
      dispatch(addPosts(posts));
    } catch (err) {
      dispatch(postsLoadingFailed(err.message));
      console.log(err);
    }
  };
};
