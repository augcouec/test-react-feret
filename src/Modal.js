import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./Modal.scss";
import bottom from "./assets/bottom_decoration.png";
import closed_modal from "./assets/closed_modal.svg";

const Modal = ({ isShowing, hide, ...props }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper">
              <div className="modal">
                <div className="modal-header">
                  <button
                    type="button"
                    className="modal-close-button"
                    onClick={hide}
                  >
                    <img src={closed_modal} alt="fermer la pop-up"></img>
                  </button>
                </div>
                <div className="modal-body">{props.children}</div>

                <img
                  src={bottom}
                  alt="decoration"
                  className="bottom_decoration_container"
                ></img>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

Modal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired
};

export default Modal;
