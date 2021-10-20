import React,  { useState } from 'react';
import PropTypes from 'prop-types';
import { NotFound } from '../NotFound/NotFound';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, addPost, isLogged } from '../../../redux/postsRedux';

import styles from './PostAdd.module.scss';

const Component = ({className, addPost, logged}) => {
  const [post, setPost] = useState('');

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  }
  const submitForm = (event) => {
    event.preventDefault();
    if(post.title.length > 1 && post.content.length > 1 && post.email){
      post.updateDate = new Date().toISOString();
      addPost(post);

      setPost({
        id: '',
        title: '',
        date: '',
        content: '',
        email: '',
        image: '',
        updateDate: '',
        status: ''
      });
    } else {
      alert('Please complete all fields');
    }
  }

  return (
    <div className={clsx(className, styles.root)}>
      {logged && (
        <div>
          <h2>Post Add</h2>
          <form className={styles.changesForm} action="/contact/send-message" method="POST" enctype="multipart/form-data" onSubmit={submitForm}>
            <label className={styles.formInput}>
              Title: <input type="text" name="title" value={post.title} onChange={handleChange}></input>
            </label>
            <label className={styles.formInput}>
              Description: <textarea type="text" name="content" value={post.content} onChange={handleChange}></textarea>
            </label>
            <label className={styles.formInput}>
              Email: <input type="text" name="email" value={post.email} onChange={handleChange}></input>
            </label>
            <label className={styles.formInput}>
              Image: <input type="file" name="image" accept=".png, .gif, .jpg" onChange={handleChange}></input>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {logged=false && (
        <NotFound />
      )}
    </div>
  )
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  logged: PropTypes.bool,
};

const mapStateToProps = state => ({
  postsAll: getAll(state),
  logged: isLogged(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
