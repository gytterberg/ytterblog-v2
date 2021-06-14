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
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

const AllPosts = (props) => {
  // const [modalOpen, setModalOpen] = useState(false);
  // when passed an array as a second argument, useeffect will run once and not again unless an element of the array has changed, ie never with an empty array
  // basically like componentDidMount
  useEffect(() => {
    props.fetchPosts();
  }, []);

  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(1);

  // set page size when drop down selection is changed
  const handleSelectChange = (event) => {
    setPageSize(event.target.value);
  };

  // set page number when next/prev is clicked
  const handlePrevNext = (event) => {
    if (event.target.outerText === 'PREVIOUS POSTS') {
      setPageNum(pageNum - 1);
    } else if (event.target.outerText === 'NEXT POSTS') {
      setPageNum(pageNum + 1);
    }
  };

  // useEffect to monitor pageSize, pageNum, refetch when changed
  useEffect(() => {
    props.fetchPosts(pageSize, pageNum);
  }, [pageSize, pageNum]);

  const renderPostsPerPage = () => {
    return (
      <FormControl>
        <Select
          // labelId="demo-simple-select-placeholder-label-label"
          // id="demo-simple-select-placeholder-label"
          value={pageSize}
          onChange={handleSelectChange}
          displayEmpty
          // className={classes.selectEmpty}
        >
          <MenuItem value="all">
            <em>All</em>
          </MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
        <FormHelperText>Posts per page</FormHelperText>
      </FormControl>
    );
  };

  const renderPageButtons = () => {
    // draw prev and next page buttons if we're not looking at all posts
    if (pageSize === 'all') {
      return null;
    } else {
      return (
        <Grid container justify="space-between">
          <Grid item>
            <Button
              disabled={pageNum === 1}
              variant="text"
              onClick={handlePrevNext}
              color="primary"
              id="prevButton"
            >
              Previous posts
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={pageNum === props.postsStatus.pageCount}
              variant="text"
              onClick={handlePrevNext}
              color="primary"
              id="nextButton"
            >
              Next posts
            </Button>
          </Grid>
        </Grid>
      );
    }
  };

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
  return (
    <Container maxWidth="md">
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="h6">All posts</Typography>
          {renderPostsPerPage()}
        </Grid>
        <Grid item>
          <PostModal />
        </Grid>
      </Grid>
      {props.posts.map((post) => renderPost(post))}
      {renderPageButtons()}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    postsStatus: state.postsStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (pageSize, pageNum) => {
      dispatch(fetchPosts(pageSize, pageNum));
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
