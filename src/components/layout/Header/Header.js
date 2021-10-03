import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { isLogged, isLogin, isLogout } from '../../../redux/postsRedux';

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

const Component = ({ className, children, logged, isLogin, isLogout }) => {
  const classes = useStyles();
  const [login, setLogin] = useState(logged);
  const handleChange = (event) => {
    event.preventDefault();
    setLogin(event.target.checked);
    if(!logged){
      isLogin(logged)
    } else{
      isLogout(logged)
    }
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
          label={login ? 'you are login' : 'you are logout'}
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

          {!logged && (
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
          {logged && (
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

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  logged: PropTypes.bool,
};

const mapStateToProps = state => ({
  logged: isLogged(state),
});

const mapDispatchToProps = dispatch => ({
  isLogin: logged => dispatch(isLogin(logged)),
  isLogout: logged => dispatch(isLogout(logged)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  Component as HeaderComponent,
};