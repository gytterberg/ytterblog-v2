import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Grid,
} from '@material-ui/core';

import { fetchPost } from '../redux/ActionCreators';
import PostCreateEditDialog from './PostCreateEditDialog';
import PostDeleteDialog from './PostDeleteDialog';

const SinglePost = (props) => {
  useEffect(() => {
    props.fetchPost(props.match.params.postId);
  }, []);

  if (typeof props.post.id === 'undefined') {
    return <>Loading</>;
  } else {
    return (
      <Box m={5}>
        <Card elevation={3} key={props.post.id}>
          <CardHeader title={props.post.title} />

          <CardContent>
            <Typography variant="body1">{props.post.body}</Typography>
          </CardContent>
          <CardActions>
            <Grid container justify="space-between">
              {'Posted by ' +
                props.post.user +
                ' --- ' +
                new Intl.DateTimeFormat('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                }).format(new Date(Date.parse(props.post.createdAt)))}
              <Grid item>
                <PostCreateEditDialog edit />
                <PostDeleteDialog />
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Box>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (postId) => {
      dispatch(fetchPost(postId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
