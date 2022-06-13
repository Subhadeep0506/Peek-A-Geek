import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPosts } from "../../actions/post";
import PostItem from "./PostItem";
import Spinner from "../layout/Spinner";
import PostForm from "./PostForm";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="bi bi-person-fill"></i> Welcome to the community!
          </p>
          <PostForm />
          {!posts.length > 0 ? (
            <h3 className="my-2">
              <i className="fa-solid fa-ban"></i> No posts available at the
              moment.
            </h3>
          ) : (
            <div className="posts">
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          )}
        </Fragment>
      )}
    </section>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
