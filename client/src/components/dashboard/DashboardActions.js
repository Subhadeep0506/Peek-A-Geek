import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <Fragment>
      <div class="dash-buttons">
        <Link to="/edit-profile" class="btn btn-light">
          <i class="bi bi-person-circle text-primary"></i> Edit Profile
        </Link>
        <Link to="/add-experience" class="btn btn-light">
          <i class="bi bi-briefcase-fill text-primary"></i> Add Experience
        </Link>
        <Link to="/add-education" class="btn btn-light">
          <i class="bi bi-mortarboard-fill text-primary"></i> Add Education
        </Link>
      </div>
    </Fragment>
  );
};

export default DashboardActions;
