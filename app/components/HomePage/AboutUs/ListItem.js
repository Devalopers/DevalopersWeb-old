/* eslint-disable react/prop-types */
import React from 'react';

export default function ListItem(props) {
  return (
    <div className="icon-box wow fadeInUp">
      <div className="icon">{props.children}</div>
      <h4 className="title">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="">{props.title}</a>
      </h4>
      <p className="description">{props.description}</p>
    </div>
  );
}
