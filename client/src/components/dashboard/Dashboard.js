import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import Education from "./Education";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]); // [] means this will run only once.

  return (
    <section className="container">
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">
            <i className="bi bi-clipboard-fill"></i> Dashboard
          </h1>
          <p className="lead">
            <i className="bi bi-person-fill"></i> Welcome{" "}
            {user && user.name.substring(0, user.name.indexOf(" "))}
          </p>
          {profile !== null ? (
            <Fragment>
              <DashboardActions />
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
              <div className="my-2">
                <button
                  onClick={() => deleteAccount()}
                  className="btn btn-danger"
                >
                  <i class="bi bi-person-dash-fill"></i> Delete Account
                </button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <p>
                You have not yet setup a profile. Click the{" "}
                <strong>Create Profile</strong> button below to create some.{" "}
              </p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </Fragment>
          )}
        </Fragment>
      )}
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
