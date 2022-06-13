import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <Fragment>
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="bi bi-person-circle text-primary"></i> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-light">
          <i className="bi bi-briefcase-fill text-primary"></i> Add Experience
        </Link>
        <Link to="/add-education" className="btn btn-light">
          <i className="bi bi-mortarboard-fill text-primary"></i> Add Education
        </Link>
      </div>
    </Fragment>
  );
};

export default DashboardActions;
