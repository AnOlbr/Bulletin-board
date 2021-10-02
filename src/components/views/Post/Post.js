import React,  { useState } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOne } from '../../../redux/postsRedux';

import styles from './Post.module.scss';
import Fab from '@material-ui/core/Fab';

const Component = ({className, postOne}) => {
  const [login, setLogin] = useState(false);
  const handleChange = (event) => {
    setLogin(!login);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Link className={styles.switchState} to='#' onClick={handleChange}>
        {login ? 'if Author or Admin:' : 'if no Author or Admin:'}
      </Link>
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
                {login && (
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
};

const mapStateToProps = (state, props) => ({
  postOne: getOne(state, props.match.params.id),
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
