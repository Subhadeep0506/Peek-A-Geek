import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <section className="container">
        <h1 class="large text-primary">Add An Experience</h1>
        <p class="lead">
          <i class="fas fa-code-branch"></i> Add your past job experiences here.
        </p>
        <small className="small-text">* = required field</small>
        <form
          class="form"
          onSubmit={(e) => {
            e.preventDefault();
            addExperience(formData, navigate);
          }}
        >
          <div class="form-group">
            <input
              type="text"
              placeholder="* Job Title"
              name="title"
              value={title}
              onChange={(event) => onChange(event)}
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="* Company"
              name="company"
              value={company}
              onChange={(event) => onChange(event)}
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
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
              Current Job
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
              placeholder="Job Description"
              value={description}
              onChange={(event) => onChange(event)}
            ></textarea>
          </div>
          <input type="submit" class="btn btn-primary my-1" />
          <Link class="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
