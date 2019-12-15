import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
export default function Modal(props) {
  if (props.status) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = 'auto';
  return (
    <ModalStyleWrapper>
      <div className={props.status ? 'modal' : 'modal-hidden'}>
        <div className="modal-content">
          <div style={{ textAlign: 'right' }}>
            <button type="button" className="close" onClick={props.close}>
              &times;
            </button>
          </div>
          {props.children}
        </div>
      </div>
    </ModalStyleWrapper>
  );
}

const ModalStyleWrapper = styled.div`
  /* The Modal (background) */
  .modal {
    display: flex;
    overflow: auto;
    min-height: 100%;
    width: 100%;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  }
  .modal::-webkit-scrollbar {
    width: 0 !important;
  }

  .modal-hidden {
    display: none;
  }

  /* Modal Content */
  .modal-content {
    width: 80%;
    margin: auto;
    overflow-y: auto;
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    max-width: 950px;
    @media only screen and (max-width: 576px) {
      width: 100%;
    }
  }

  .close {
    text-align: right;
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    width: 50px;
    outline: none;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;

Modal.propTypes = {
  close: PropTypes.func,
  children: PropTypes.node,
  status: PropTypes.bool,
};
