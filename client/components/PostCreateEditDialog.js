import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  fetchPosts,
  submitPost,
  editPost,
  deletePost,
} from '../redux/ActionCreators';
import {
  Dialog,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  makeStyles,
  IconButton,
  Grid,
  TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modalTitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0),
    top: theme.spacing(0),
    color: theme.palette.grey[500],
  },
}));

const PostDeleteDialog = (props) => {
  let initialPostState;
  if (props.edit) {
    initialPostState = {
      id: props.post.id,
      title: props.post.title,
      body: props.post.body,
      user: 'gy',
    };
  } else {
    console.log('We are an add post');
    initialPostState = { title: '', body: '', user: 'gy' };
  }
  const [post, setPost] = useState(initialPostState);
  const [open, setOpen] = useState(false);

  const classes = useStyles(props);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    props.submitPost(post);
    setOpen(false);
    setPost({ title: '', body: '', user: 'gy' });
  };

  const handleEdit = () => {
    props.editPost(post);
    setOpen(false);
    setPost({ title: '', body: '', user: 'gy' });
  };

  const textFieldChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const DisplayButton = () => {
    if (props.edit) {
      return (
        <Button variant="link" color="primary" onClick={handleClickOpen}>
          Edit post
        </Button>
      );
    } else {
      return (
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add post
        </Button>
      );
    }
  };

  const ActionButton = () => {
    if (props.edit) {
      return (
        <Button onClick={handleEdit} color="primary">
          Submit changes
        </Button>
      );
    } else {
      return (
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      );
    }
  };

  console.log(props);
  return (
    <>
      <DisplayButton />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle disableTypography className={classes.modalTitle}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6">Create a post</Typography>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="close"
                size="small"
                className={classes.closeButton}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>Some text for the form</DialogContentText>
          <form noValidate autoComplete="off">
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  name="title"
                  label="Title"
                  variant="filled"
                  value={post.title}
                  onChange={textFieldChange}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  name="body"
                  label="Post"
                  variant="filled"
                  multiline
                  rows={6}
                  value={post.body}
                  onChange={textFieldChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <ActionButton />
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitPost: (post) => {
      return dispatch(submitPost(post));
    },
    editPost: (post) => {
      dispatch(editPost(post));
    },
    // deletePost: (postId) => {
    //   dispatch(deletePost(postId));
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDeleteDialog);
