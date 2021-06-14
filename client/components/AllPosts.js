import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import {
  fetchPosts,
  submitPost,
  editPost,
  deletePost,
} from '../redux/ActionCreators';

import PostModal from './PostCreateEditDialog';
import Loading from './Loading';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
  Link,
} from '@material-ui/core';

const AllPosts = (props) => {
  // const [modalOpen, setModalOpen] = useState(false);
  // when passed an array as a second argument, useeffect will run once and not again unless an element of the array has changed, ie never with an empty array
  // basically like componentDidMount
  useEffect(() => {
    props.fetchPosts();
  }, []);

  const renderPost = (post) => {
    return (
      <Box m={5} key={post.id}>
        <Card elevation={3}>
          <CardActionArea>
            <CardHeader title={post.title} />

            <CardContent>
              <Typography variant="body1">{post.body}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Grid container justify="space-between">
              {'Posted by ' +
                post.user +
                ' --- ' +
                new Intl.DateTimeFormat('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                }).format(new Date(Date.parse(post.createdAt)))}
              <Link
                to="#"
                onClick={() => props.history.push(`/blog/${post.id}`)}
              >
                link
              </Link>
            </Grid>
          </CardActions>
        </Card>
      </Box>
    );
  };
  console.log(props);
  return (
    <Container maxWidth="md">
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="h6">All posts</Typography>
        </Grid>
        <Grid item>
          <PostModal />
        </Grid>
      </Grid>
      {props.posts.map((post) => renderPost(post))}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => {
      dispatch(fetchPosts());
    },
    submitPost: (newPost) => {
      dispatch(submitPost(newPost));
    },
    editPost: (post) => {
      dispatch(editPost(post));
    },
    deletePost: (postId) => {
      dispatch(deletePost(postId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);
