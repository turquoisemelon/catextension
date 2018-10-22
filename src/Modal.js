import React, { Component } from 'react';
import './Modal.css';

export class Modal extends Component {
    closeModal(e) {
        if (e.target == this.modal || e.target == this.content) {
            this.modal.style.display = "none";
        }
        return;
    }

    render() {
        return (
            <div class="_extension-modal"
                ref={(node) => {this.modal=node}}
                onClick={(ev) => this.closeModal(ev)}           
            >
                <div class="_extension-modal-content">
                    {this.props.imgUrl ? <img src={`${this.props.imgUrl}`} /> : null}
                </div>
            </div>)
    }
};