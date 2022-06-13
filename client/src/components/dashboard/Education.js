import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import formatDate from "../../utils/formatDate";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : "Present"}
      </td>
      <td>
        <button
          onClick={() =>
            confirmAlert({
              title: "Delete Education Credential?",
              message: "Are you sure you want to delete this credential?",
              buttons: [
                {
                  label: "Proceed",
                  onClick: () => deleteEducation(edu._id),
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
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
