import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <section className="container">
        <h1 class="large text-primary">Add Your Education</h1>
        <p class="lead">
          <i class="fas fa-code-branch"></i> Add any School, College or
          University you have attended.
        </p>
        <small className="small-text">* = required field</small>
        <form
          class="form"
          onSubmit={(e) => {
            e.preventDefault();
            addEducation(formData, navigate);
          }}
        >
          <div class="form-group">
            <input
              type="text"
              placeholder="* School, College or University"
              name="school"
              value={school}
              onChange={(event) => onChange(event)}
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="* Degree or Certificate"
              name="degree"
              value={degree}
              onChange={(event) => onChange(event)}
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Field of Study"
              name="fieldofstudy"
              value={fieldofstudy}
              onChange={(event) => onChange(event)}
            />
          </div>
          <div class="form-group">
            <h4>From Date</h4>
            <input
              type="date"
              name="from"
              value={from}
              onChange={(event) => onChange(event)}
            />
          </div>
          <div class="form-group">
            <label>
              <input
                type="checkbox"
                name="current"
                checked={current}
                value={current}
                onChange={(event) => {
                  setFormData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
              />{" "}
              Current
            </label>
          </div>
          <div class="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              value={to}
              onChange={(event) => onChange(event)}
              disabled={toDateDisabled ? "disabled" : ""}
            />
          </div>
          <div class="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Program Description"
              value={description}
              onChange={(event) => onChange(event)}
            ></textarea>
          </div>
          <input type="submit" class="btn btn-primary my-1" />
          <Link class="btn btn-light my-1" to="/dashboard">
            <i className="bi bi-backspace-fill"></i> Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
