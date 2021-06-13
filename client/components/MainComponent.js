import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import AllPosts from './AllPostsComponent';
import SinglePost from './SinglePostComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Photojumbo from './JumbotronComponent';
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
