import React, { Fragment } from 'react';
import "./style.css"

const ArticlePage = ({ title, image, content }) => {
  return (
    <Fragment>
    <div className="article">
      <img src={image} alt={title} className="article__image" />
      <h2 className="article__title">{title}</h2>
      <p className="article__content">{content}</p>
    </div>
    </Fragment>
  );
};

export default ArticlePage;