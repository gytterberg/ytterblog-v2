import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';

import { fetchPost } from '../redux/ActionCreators';
import PostCreateEditDialog from './PostCreateEditDialog';
import PostDeleteDialog from './PostDeleteDialog';

const SinglePost = (props) => {
  useEffect(() => {
    props.fetchPost(props.match.params.postId);
  }, [props.location]);

  const handlePrevNext = (event) => {
    // push requested post into history
    if (event.target.outerText === 'PREVIOUS POST') {
      console.log('Clicked prev button');
      props.history.push(`${props.post.prev}`);
    } else if (event.target.outerText === 'NEXT POST') {
      props.history.push(`${props.post.next}`);
    }
  };

  // draw next/prev buttons
  const renderPageButtons = () => {
    // draw prev and next page buttons if we're not looking at all posts
    return (
      <Grid container justify="space-between">
        <Grid item>
          <Button
            disabled={props.post.prev === null}
            variant="text"
            onClick={handlePrevNext}
            color="primary"
          >
            Previous post
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={props.post.next === null}
            variant="text"
            onClick={handlePrevNext}
            color="primary"
          >
            Next post
          </Button>
        </Grid>
      </Grid>
    );
  };

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
        {renderPageButtons()}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SinglePost)
);
