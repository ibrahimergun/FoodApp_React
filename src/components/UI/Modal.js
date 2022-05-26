import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={Styles.backdrop}  onClick={props.onClose} ></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={Styles.modal}>
      <div className={Styles.content}> {props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement,
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement,
      )}
    </React.Fragment>
  );
};

export default Modal;
