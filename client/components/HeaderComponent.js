import React, { Component } from 'react';
// import {
//   Navbar,
//   NavbarBrand,
//   Nav,
//   NavbarToggler,
//   Collapse,
//   NavItem,
// } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles, useTheme } from '@material-ui/core/styles';

const useStyles = (theme) => ({
  header: {
    position: 'sticky',
  },
});

const Header = (props) => {
  const { classes } = props;
  const theme = useTheme();
  console.log(theme);
  const allTabs = { home: '/home', blog: '/blog', about: '/about' };
  console.log('Header props:');
  console.log(props);
  return (
    <React.Fragment>
      <AppBar className={classes.header}>
        <Toolbar>
          <Tabs
            value={location.pathname}
            // onChange={handleChange}
            indicatorColor="secondary"
            textColor={theme.palette.grey[200]}
            centered
          >
            <Tab
              label="Home"
              value={allTabs.home}
              component={Link}
              to={allTabs.home}
            />
            <Tab
              label="Blog"
              value={allTabs.blog}
              component={Link}
              to={allTabs.blog}
            />
            <Tab
              label="About"
              value={allTabs.about}
              component={Link}
              to={allTabs.about}
              disabled
            />
          </Tabs>
          {/* </Paper> */}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withRouter(withStyles(useStyles)(Header));
