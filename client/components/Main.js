import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import AllPosts from './AllPosts';
import SinglePost from './SinglePost';
import Contact from './Contact';
import About from './About';
import Photojumbo from './Jumbotron';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const Main = (props) => {
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Header />
        <Photojumbo />
        <Switch location={props.location}>
          <Route path="/home" component={Home} />
          <Route exact path="/blog" component={withRouter(AllPosts)} />
          <Route path="/blog/:postId" component={withRouter(SinglePost)} />
          {/* <Route path="/blog/edit/:postId" component={withRouter(Blog)} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} /> */}
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </Container>
    </React.Fragment>
  );
};

export default Main;
