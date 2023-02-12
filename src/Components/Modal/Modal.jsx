import React, { Component } from "react";
import "./Modal.scss";

class Modal extends Component {
  render() {
    return (
      <div className="modal-blur">
        <div className="modal-wraper">
          <div className="modal-main">
            <div className="modal-header">
              <button className="">
                <i class="bx bx-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                est dolores officiis dolor accusantium aperiam hic magni a
                debitis iusto.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
