import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// mport { isLogged, logIn, logOut } from '../../../redux/postsRedux';

import styles from './Header.module.scss';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { red, green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Component = ({ className, children }) => {
  const classes = useStyles();
  const [login, setLogin] = useState(false);
  const handleChange = (event) => {
    setLogin(event.target.checked);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={login}
              onChange={handleChange}
              aria-label='login switch'
            />
          }
          label={login ? 'if Login' : 'if Logout'}
        />
      </FormGroup>
      <AppBar position='static'>
        <Toolbar className={styles.toolbar}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            href='/'
          >
            <HomeIcon/>
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Bulletin
          </Typography>

          {!login && (
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                style={{ color: green[500] }}
                href='https://google.com'
              >
                <AccountCircle />
                  Login by Auth0
              </IconButton>
            </div>
          )}
          {login && (
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
              >
                <Link to={'/'} className={styles.link}>
                  My adverts
                </Link>
              </IconButton>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                style={{ color: red[500] }}
                href='/'
              >
              <AccountCircle />
                Logout
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {children}
    </div>
  );
};

/*
const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <h2>Header</h2>
    <a href='https://google.com'>Login</a>

    {children}
  </div>
);
*/
Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};