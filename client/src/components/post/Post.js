import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import { getPost } from "../../actions/post";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return (
    <section className="container">
      <Fragment>
        <h1 className="large text-primary">
          <i className="bi bi-chat-right-dots-fill"></i> Discussions
        </h1>
        <Link to={`/posts`} className="btn btn-light">
          <i className="bi bi-backspace-fill"></i> Back To Posts
        </Link>
      </Fragment>
      {loading || post === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <h2 className="text-primary">
            {" "}
            <i className="bi bi-chat-dots-fill"></i> Comments
          </h2>
          <div className="comments">
            {post.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            ))}
          </div>
        </Fragment>
      )}
    </section>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
