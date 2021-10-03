import React,  { useState } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOne, isLogged } from '../../../redux/postsRedux';


import styles from './Post.module.scss';
import Fab from '@material-ui/core/Fab';

const Component = ({className, postOne, logged}) => {
  return (
    <div className={clsx(className, styles.root)}>
        <div className={styles.postCard}>
          {postOne.map(post => (
            <div key={post.id}>
              <img className={styles.image} src={post.image} alt='' />
              <div>
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.info}>Added: {post.date}</p>
                <p className={styles.about}>{post.content}</p>
                <p className={styles.info}>Email: {post.email} </p>
                <p className={styles.info}>Edited: {post.updateDate}</p>
                <p className={styles.info}>Status: {post.status}</p>
                {logged && (
                <Link className={styles.button} to={`/post/${post.id}/edit`}>
                  <Fab
                    size='small'
                    color='secondary'
                    aria-label='add'
                    variant='extended'
                  >
                    Edit Post
                  </Fab>
                </Link>
                )}
              </div>
            </div>
          ))}
        </div>
    </div>
  )
};

Component.propTypes = {
  className: PropTypes.string,
  postsOne: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.string,
      date: PropTypes.string,
      updateDate: PropTypes.string,
      email: PropTypes.string,
      status: PropTypes.string,
      image: PropTypes.string,
    })
  ),
  logged: PropTypes.bool,
};

const mapStateToProps = (state, props) => ({
  postOne: getOne(state, props.match.params.id),
  logged: isLogged(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as Post,
  Container as Post,
  Component as PostComponent,
};
