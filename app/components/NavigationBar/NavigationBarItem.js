import React from 'react';

function NavigationBarItem(props) {
  return (
    <li className="nav-item active">
      <a className="nav-link" href={props.item.link}>
        {props.item.label}
      </a>
    </li>
  );
}

export default NavigationBarItem;
