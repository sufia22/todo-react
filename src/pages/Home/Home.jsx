import React, { Component } from "react";
import TodoModal from "../../Components/TodoModal/TodoModal";
import "./Todo.scss";
// import Modal from "../../Components/Modal/Modal";

export class Todo extends Component {
  render() {
    return (
      <div className="home">
        <TodoModal>
          <h1>Hello</h1>
        </TodoModal>
        Home Page
      </div>
    );
  }
}

export default Todo;
