import React, { Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import icon from "../../img/icon01.webp";
import "../../App.css";
import "./landing.css";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Fragment>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <img src={icon} alt="logo" className="app-logo" />
            <h1 className="x-large">Peek-A-Geek</h1>
            <p className="lead">
              A Platform for Geeks to Communicate and Share Their Projects.
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-light">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStatesToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStatesToProps)(Landing);
