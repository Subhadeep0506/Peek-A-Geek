import React from "react";
import PropTypes from "prop-types";

import formatDate from "../../utils/formatDate";

const ProfileEducation = ({
  education: { school, degreee, fieldofstudy, to, from, description },
}) => {
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        {formatDate(from)} - {to ? formatDate(to) : "Present"}
      </p>
      <p>
        <strong>Degree: </strong>
        {degreee}
      </p>
      <p>
        <strong>Field of Study: </strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = { education: PropTypes.object.isRequired };

export default ProfileEducation;
