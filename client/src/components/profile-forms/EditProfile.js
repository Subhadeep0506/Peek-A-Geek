import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { createProfile, getCurrentProfile } from "../../actions/profile";

const initialState = {
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubusername: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  instagram: "",
  youtube: "",
};

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    // If there is no profile, fetch one
    if (!profile) getCurrentProfile();

    if (!loading && profile) {
      const profileData = { ...initialState };

      for (const key in profile) {
        if (key in profileData) {
          profileData[key] = profile[key];
        }
      }

      for (const key in profile.social) {
        if (key in profileData) {
          profileData[key] = profile.social[key];
        }
      }

      if (Array.isArray(profileData.skills)) {
        profileData.skills = profileData.skills.join(", ");
      }

      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, profile ? true : false);
  };

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">
          <i className="bi bi-person-lines-fill"/> {!profile ? "Create" : "Edit"}{" "}
          Your Profile
        </h1>
        <p className="lead">
          <i className="bi bi-pencil-square"/> Let's get some information to
          make your profile stand out
        </p>
        <small className="small-text">* = required field</small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <select
              name="status"
              value={status}
              onChange={(event) => onChange(event)}
            >
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={(event) => onChange(event)}
            />
            <small className="form-text">
              Could be your own company or one you work for
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={(event) => onChange(event)}
            />
            <small className="form-text">
              Could be your own or a company website
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={(event) => onChange(event)}
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Skills"
              name="skills"
              value={skills}
              onChange={(event) => onChange(event)}
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              name="githubusername"
              value={githubusername}
              onChange={(event) => onChange(event)}
            />
            <small className="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              value={bio}
              onChange={(event) => onChange(event)}
            />
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="my-2">
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type="button"
              className="btn btn-light"
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>

          {displaySocialInputs && (
            <Fragment>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"/>
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={(event) => onChange(event)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"/>
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={(event) => onChange(event)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"/>
                <input
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={(event) => onChange(event)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"/>
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={(event) => onChange(event)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"/>
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={(event) => onChange(event)}
                />
              </div>
            </Fragment>
          )}

          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  EditProfile
);
