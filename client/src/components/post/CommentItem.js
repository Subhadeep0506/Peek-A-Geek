import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { deleteComment } from "../../actions/post";
import formatDate from "../../utils/formatDate";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => {
  return (
    <div className="post bg-post p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on {formatDate(date)}</p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() =>
              confirmAlert({
                title: "Delete Comment?",
                message: "Are you sure you want to delete this comment?",
                buttons: [
                  {
                    label: "Proceed",
                    onClick: () => deleteComment(postId, _id),
                  },
                  {
                    label: "Cancel",
                  },
                ],
                closeOnClickOutside: true,
              })
            }
            type="button"
            className="btn btn-danger"
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
