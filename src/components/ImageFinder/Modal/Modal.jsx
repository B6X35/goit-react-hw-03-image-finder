import { Component } from "react";
import { createPortal } from "react-dom";
import style from "./Modal.module.css";
import PropTypes from "prop-types"; 

const modalRoot = document.querySelector("#modal-root");
class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.close);
  }

  componentDidUpdate() {
    window.addEventListener("keydown", this.close);
}

  close = (e) => {
    if (e.code === "Escape") {
      return this.props.closeModal();
    }
  };

  closeModal = (e) => {
    const { currentTarget, target } = e;
    if (currentTarget === target) {
      this.props.closeModal();
    }
  };

  render() {
    const {children} = this.props;
    const { closeModal } = this;
    return createPortal(
      <div onClick={closeModal} className={style.overlay}>
        <div className={style.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propType = {
    closeModal: PropTypes.func.isRequired
}