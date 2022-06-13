import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/auth";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <h1>
        <Link to="/">
          <i className="footer-logo fa-solid fa-circle-nodes"></i>
        </Link>
      </h1>
      <p>&copy; 2022 Copyright: Subhadeep Mandal</p>
    </footer>
  );
};

Footer.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Footer);
