import React from "react";
import "./TodoModal.scss";

const TodoModal = ({ hide, children }) => {
  return (
    <div className="box">
      <div className="modal-blur">
        <div className="modal-wraper">
          <div className="modal-main">
            <div className="modal-header">
              <button onClick={() => hide(false)} className="">
                <i class="bx bx-x"></i>
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
