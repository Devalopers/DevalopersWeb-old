/* eslint-disable react/prop-types */
import React from 'react';

export default function AboutUsSection(props) {
  const image = (
    <div className="col-lg-6 wow fadeInUp">
      <img src={props.img} className="img-fluid" alt="" />
    </div>
  );
  return (
    <div>
      <div className="row about-extra about-container">
        {props.imgAlign === 'left' ? image : null}
        <div className="col-lg-6 wow fadeInUp pt-5 pt-lg-0">
          <h4>{props.title}</h4>
          {props.children}
        </div>
        {props.imgAlign === 'right' ? image : null}
      </div>
    </div>
  );
}
