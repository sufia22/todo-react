import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import TodoModal from "../../Components/TodoModal/TodoModal";
import "./Edit.scss";

export class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      input: {
        title: "",
        status: "incomplete",
      },
      modalShow: false,
      modalEdit: false,
    };
  }

  componentDidMount = () => {
    axios
      .get("http://localhost:5050/todos")
      .then((res) => {
        this.setState((prevState) => ({
          ...prevState,
          todos: [...res.data],
        }));
      })
      .catch();
  };

  // handle modal show
  handleModalShow = () => {
    this.setState({
      modalShow: true,
    });
  };

  // handle modal hide
  handleModalHide = () => {
    this.setState({
      modalShow: false,
    });
  };

  // handle input change
  handleInputChange = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      input: {
        ...prevState.input,
        [e.target.name]: e.target.value,
      },
    }));
  };

  // handle update submit
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("updated");
  };

  // handle delete todo
  handleDeleteTodo = (id) => {
    axios.delete(`http://localhost:5050/todos/${id}`).then((res) => {
      this.setState((prevState) => ({
        ...prevState,
        todos: [...prevState.todos.filter((data) => data.id !== id)],
      }));
    });
  };

  // handle complete button
  handleComplete = () => {
    this.setState({
      input: {
        ...this.state.input,
        status: "complete",
      },
    });
  };
  render() {
    const { todos, input, modalShow } = this.state;
    return (
      <div className="box">
        {/* <div className="todo">
          <div className="header text-center my-5">
            <h1>TODO List</h1>
          </div>
          <div className="container todo ">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="header-button mb-3 d-flex justify-content-between align-middle">
                  <button onClick={this.handleModalShow} className="btn">
                    Add Task
                  </button>

                  <div className="select">
                    <select>
                      <option value="all">All</option>
                      <option value="complete">Complete</option>
                      <option value="incomplete">Incomplete</option>
                    </select>
                  </div>
                </div>

                <div className="card box ">
                  <div className="card-body">
                    <div className="todo-list mt-4">
                      <ul className="list-group">
                        {todos.reverse().map((item, index) => {
                          let statusColor = "#656fed";
                          let textDecoration = "";

                          switch (item.status) {
                            case "complete":
                              statusColor = "#1ecc35";
                              textDecoration = "line-through";
                              break;

                            default:
                              statusColor = "#656fed";
                              textDecoration = "";
                          }

                          return (
                            <li
                              key={index}
                              className="list-group-item d-flex justify-content-between mb-2"
                            >
                              <div className="todo-info d-flex align-items-center gap-2">
                                <button
                                  style={{ color: statusColor }}
                                  className="check-icon"
                                >
                                  <i class="bx bxs-check-circle"></i>
                                </button>
                                <span
                                  style={{ textDecoration: textDecoration }}
                                  className="mb-1"
                                >
                                  {item.title}
                                </span>
                              </div>
                              <div className="todo-icon">
                                <Link to={`/edit/${item.id}`}>
                                  <i class="bx bx-edit"></i>
                                </Link>

                                <button
                                  onClick={() => this.handleDeleteTodo(item.id)}
                                >
                                  <i class="bx bx-trash"></i>
                                </button>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {modalShow && (
            <TodoModal hide={this.handleModalHide}>
              <div className="todo-box ">
                <h4>Add Task</h4>
                <form onSubmit={this.handleSubmit}>
                  <div className="my-3">
                    <label htmlFor="">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={input.title}
                      onChange={this.handleInputChange}
                      className="form-control"
                    />
                  </div>

                  <div className="my-3">
                    <label htmlFor="">Status</label>
                    <select
                      name="status"
                      value={input.status}
                      onChange={this.handleInputChange}
                      className="form-control"
                    >
                      <option value="incomplete">Incomplete</option>
                      <option value="complete">Complete</option>
                    </select>
                  </div>

                  <div className="my-3 mt-4">
                    <button className="btn btn-primary border-0 me-2 add-task">
                      Add Task
                    </button>
                    <button className="btn cancel">Cancel</button>
                  </div>
                </form>
              </div>
            </TodoModal>
          )}
        </div> */}

        <div className="modal-blur">
          <div className="modal-wraper">
            <div className="modal-main">
              <div className="modal-header">
                <Link to={"/"} className="">
                  <i class="bx bx-x"></i>
                </Link>
              </div>
              <div className="modal-body">
                <div className="todo-box ">
                  <h4>Update Task</h4>
                  <form onSubmit={this.handleSubmit}>
                    <div className="my-3">
                      <label htmlFor="">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={input.title}
                        onChange={this.handleInputChange}
                        className="form-control"
                      />
                    </div>

                    <div className="my-3">
                      <label htmlFor="">Status</label>
                      <select
                        name="status"
                        value={input.status}
                        onChange={this.handleInputChange}
                        className="form-control"
                      >
                        <option value="incomplete">Incomplete</option>
                        <option value="complete">Complete</option>
                      </select>
                    </div>

                    <div className="my-3 mt-4">
                      <button className="btn btn-primary border-0 me-2 add-task">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
