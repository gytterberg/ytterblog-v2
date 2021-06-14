import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { deletePost } from '../redux/ActionCreators';
import {
  Dialog,
  Typography,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  makeStyles,
  IconButton,
  Grid,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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
  const classes = useStyles(props);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    props.deletePost(props.post.id);
    setOpen(false);
    props.history.push('/blog');
  };

  return (
    <>
      <Button variant="text" color="primary" onClick={handleClickOpen}>
        Delete post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle disableTypography className={classes.modalTitle}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6">Delete post</Typography>
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
          <DialogContentText>
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Delete</Button>
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
    deletePost: (postId) => {
      dispatch(deletePost(postId));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDeleteDialog)
);
