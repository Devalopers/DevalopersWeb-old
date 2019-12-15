import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import image from '../images/curve-5.png';
import 'font-awesome/css/font-awesome.min.css';

export default function BreadCrumb(props) {
  return (
    <BreadCrumbStyleWrapper>
      <div className="breadcrumb-area">
        <div className="container h-100">
          <div className="row h-100 align-items-end">
            <div className="col-12">
              <div className="breadcumb--con">
                <h2 className="title">{props.title}</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">
                        <i className="fa fa-home" /> Home
                      </a>
                    </li>
                    {props.items.map(item => (
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                        key={item}
                      >
                        {item}
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="breadcrumb-bg-curve">
          <img src={image} alt="" />
        </div>
      </div>
    </BreadCrumbStyleWrapper>
  );
}

BreadCrumb.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
};

const BreadCrumbStyleWrapper = styled.div`
  img {
    max-width: 100%;
    height: auto;
  }

  .breadcrumb-area {
    position: relative;
    z-index: 0;
    height: 290px;
    margin-bottom: 40px;
  }

  @media only screen and (min-width: 768px) and (max-width: 991px) {
    .breadcrumb-area {
      height: 220px;
    }
  }

  @media only screen and (max-width: 767px) {
    .breadcrumb-area {
      height: 200px;
      margin-bottom: 0;
    }
  }

  .breadcrumb-area .breadcrumb-bg-curve {
    position: absolute;
    width: 80%;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    background-size: cover;
    text-align: right !important;
  }

  @media only screen and (min-width: 992px) and (max-width: 1199px) {
    .breadcrumb-area .breadcrumb-bg-curve {
      width: 90%;
    }
  }

  .breadcrumb-area .title {
    font-size: 60px;
    margin-bottom: 0;
    text-transform: capitalize;
  }

  @media only screen and (min-width: 992px) and (max-width: 1199px) {
    .breadcrumb-area .title {
      font-size: 42px;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 991px) {
    .breadcrumb-area .title {
      font-size: 36px;
    }
  }

  @media only screen and (max-width: 767px) {
    .breadcrumb-area .title {
      font-size: 30px;
    }
  }

  .breadcrumb-area .breadcumb--con .breadcrumb {
    padding: 0;
    margin-bottom: 0;
    list-style: none;
    background-color: transparent;
    border-radius: 0;
  }

  .breadcrumb-area .breadcumb--con .breadcrumb .breadcrumb-item,
  .breadcrumb-area .breadcumb--con .breadcrumb .breadcrumb-item > a,
  .breadcrumb-area .breadcumb--con .breadcrumb .breadcrumb-item.active {
    font-size: 18px;
    text-transform: capitalize;
    color: #303030;
    font-weight: normal;
    letter-spacing: normal;
  }

  @media only screen and (max-width: 767px) {
    .breadcrumb-area .breadcumb--con .breadcrumb .breadcrumb-item,
    .breadcrumb-area .breadcumb--con .breadcrumb .breadcrumb-item > a,
    .breadcrumb-area .breadcumb--con .breadcrumb .breadcrumb-item.active {
      font-size: 14px;
    }
  }

  .breadcrumb-area .breadcumb--con .breadcrumb .breadcrumb-item:focus,
  .breadcrumb-area .breadcumb--con .breadcrumb .breadcrumb-item:hover,
  .breadcrumb-area .breadcumb--con .breadcrumb .breadcrumb-item > a:focus,
  .breadcrumb-area .breadcumb--con .breadcrumb .breadcrumb-item > a:hover,
  .breadcrumb-area .breadcumb--con .breadcrumb .breadcrumb-item.active:focus,
  .breadcrumb-area .breadcumb--con .breadcrumb .breadcrumb-item.active:hover {
    color: #1583e9;
  }

  .breadcrumb-area .breadcumb--con .breadcrumb .breadcrumb-item.active {
    color: #a6a6a6;
  }

  .breadcrumb-area .breadcumb--con .breadcrumb .breadcrumb-item.active:focus,
  .breadcrumb-area .breadcumb--con .breadcrumb .breadcrumb-item.active:hover {
    color: #a6a6a6;
  }

  .breadcrumb-area
    .breadcumb--con
    .breadcrumb
    .page-item:first-child
    .page-link {
    margin-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .breadcrumb-area
    .breadcumb--con
    .breadcrumb
    .page-item:last-child
    .page-link {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .breadcrumb-area
    .breadcumb--con
    .breadcrumb
    .breadcrumb-item
    + .breadcrumb-item::before {
    content: '\f105';
    font-family: 'FontAwesome';
  }
`;
