/* eslint-disable react/prop-types,jsx-a11y/anchor-is-valid */
import React from 'react';

export default function ServiceItem(props) {
  const posStyle =
    props.align === 'left'
      ? 'col-md-6 col-lg-5 offset-lg-1 wow bounceInUp'
      : 'col-md-6 col-lg-5 wow bounceInUp';
  return (
    <div className={posStyle}>
      <div className="box">
        <div className="icon">{props.children}</div>
        <h4 className="title">
          <a href="">{props.title}</a>
        </h4>
        <p className="description">{props.description}</p>
      </div>
    </div>
  );
}
