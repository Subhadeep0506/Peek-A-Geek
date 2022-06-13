import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getGithubRepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import "./language-colors.css";
import GithubLangs from "./GithubLangs";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo, key) => (
          <div key={key} className="repo bg-white p-1 my-1">
            <div className="repo-body">
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <GithubLangs repo={repo} className="repo-lang-row" />
              </div>
            </div>
            <div>
              <ul>
                <li className="badge badge-stars p-2">
                  <i className="bi bi-star-fill"></i> Stars:{" "}
                  {repo.stargazers_count}
                </li>
                <li className="badge badge-watcher p-2">
                  <i className="bi bi-eye-fill"></i> Watchers:{" "}
                  {repo.watchers_count}
                </li>
                <li className="badge badge-fork p-2">
                  <i className="fa-solid fa-code-fork"></i> Forks:{" "}
                  {repo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapSpateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapSpateToProps, { getGithubRepos })(ProfileGithub);
