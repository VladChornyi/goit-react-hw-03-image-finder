import React, { Component } from 'react';

class Modal extends Component {
  state = {
    isLoading: false,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
  }

  handleEscape = e => e.code === 'Escape' && this.props.closeModal();

  onOverlayClick = ({ target, currentTarget }) => {
    target === currentTarget && this.props.closeModal();
  };

  render() {
    return (
      <div onClick={this.onOverlayClick} className="Overlay">
        <div className="Modal">
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
