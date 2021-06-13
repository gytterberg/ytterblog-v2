import {
  AppBar,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import EmailIcon from '@material-ui/icons/Email';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';
import { Copyright, GitHub, Instagram, LinkedIn } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  footer: {
    // position: 'sticky',
    padding: theme.spacing(6, 0),
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          <Copyright />
          Gabriel Ytterberg
        </Typography>
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography variant="subtitle1" align="center">
            <a href="https://github.com/gytterberg">
              <GitHub />
            </a>
            <a href="https://www.instagram.com/gytterberg/">
              <Instagram />
            </a>
            <a href="https://www.linkedin.com/in/gabriel-ytterberg-8ab87a14/">
              <LinkedIn />
            </a>
          </Typography>
        </Grid>
      </Container>
    </footer>
  );
};

export default withRouter(Footer);
