import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import formatDate from "../../utils/formatDate";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : "Present"}
      </td>
      <td>
        <button
          onClick={() =>
            confirmAlert({
              title: "Delete Comment?",
              message: "Are you sure you want to delete this comment?",
              buttons: [
                {
                  label: "Proceed",
                  onClick: () => deleteExperience(exp._id),
                },
                {
                  label: "Cancel",
                },
              ],
              closeOnClickOutside: true,
            })
          }
          className="btn btn-danger"
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
