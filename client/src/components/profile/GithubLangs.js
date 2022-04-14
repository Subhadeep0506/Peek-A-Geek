import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./language-colors.css";
import "../../App.css";

const GithubLangs = ({ repo }) => {
  const [language, setLanguage] = useState([]);

  useEffect(() => {
    fetch(repo.languages_url)
      .then((response) => response.json())
      .then((jsonData) => {
        setLanguage(Object.keys(jsonData));
      });
  }, [repo.languages_url]);
  return (
    <div>
      {language.slice(0, 6).map((lang, key) => (
        <small key={key} className="lang-item">
          <i className={`${lang} bi bi-circle-fill`}></i> {lang}
        </small>
      ))}
    </div>
  );
};

GithubLangs.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default GithubLangs;
