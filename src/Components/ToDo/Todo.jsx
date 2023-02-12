import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import TodoModal from "../TodoModal/TodoModal";
import "./Todo.scss";

export class Todo extends Component {
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
      all_data: [],
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

  // handle form submit
  handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5050/todos", this.state.input).then((res) => {
      this.setState((prevState) => ({
        ...prevState,
        todos: [...prevState.todos, this.state.input],
        input: {
          title: "",
        },
      }));
    });
    this.handleModalHide();
  };

  // handle delete todo
  handleDeleteTodo = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:5050/todos/${id}`).then((res) => {
          this.setState((prevState) => ({
            ...prevState,
            todos: [...prevState.todos.filter((data) => data.id !== id)],
          }));
        });
      }
    });
  };

  // handle show complete tasks
  handleStatus = (e) => {
    this.handleSelecetedValue(e.target.value);
  };

  // handle selected value
  handleSelecetedValue = (statusValue) => {
    if (statusValue === "complete") {
      axios.get("http://localhost:5050/todos?status=complete").then((res) => {
        this.setState((prevState) => ({
          ...prevState,
          todos: [...res.data],
        }));
      });
    } else if (statusValue === "incomplete") {
      axios.get("http://localhost:5050/todos?status=incomplete").then((res) => {
        this.setState((prevState) => ({
          ...prevState,
          todos: [...res.data],
        }));
      });
    } else {
      axios.get("http://localhost:5050/todos").then((res) => {
        this.setState((prevState) => ({
          ...prevState,
          todos: [...res.data],
        }));
      });
    }
  };

  handleCompleteTask = (id) => {
    axios
      .patch(`http://localhost:5050/todos/${id}`, { status: "complete" })
      .then((res) =>
        this.setState((prevState) => ({
          ...prevState,
          todos: [
            ...prevState.todos.filter((data) => data.id !== id),
            res.data,
          ],
        }))
      );
  };

  render() {
    const { todos, input, modalShow } = this.state;

    return (
      <div className="todo">
        <div className="header text-center my-5">
          <h1>TODO List</h1>
        </div>
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="header-button mb-3 d-flex justify-content-between align-middle">
                <button onClick={this.handleModalShow} className="btn">
                  Add Task
                </button>

                <div className="select-box">
                  <select className="form-select" onChange={this.handleStatus}>
                    <option value="all">All</option>
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                  </select>
                </div>
              </div>

              {todos.length > 0 && (
                <div className="card box ">
                  <div className="card-body">
                    <div className="todo-list mt-4">
                      <ul className="list-group">
                        {todos.reverse().map((item, index) => {
                          let statusColor = "#656fed";
                          let textDecoration = "";
                          let textColor = "";
                          let display = "none";

                          switch (item.status) {
                            case "complete":
                              statusColor = "#1ecc35";
                              textDecoration = "line-through";
                              textColor = "#888";
                              display = "block";
                              break;

                            default:
                              statusColor = "#656fed";
                              textDecoration = "";
                              textColor = "#333";
                          }

                          return (
                            <li
                              handleSelecetedValue={this.handleSelecetedValue}
                              key={index}
                              className="list-group-item d-flex justify-content-between mb-2"
                            >
                              <div className="todo-info d-flex align-items-center gap-2">
                                <button
                                  style={{ color: statusColor }}
                                  className="check-icon"
                                  onClick={() =>
                                    this.handleCompleteTask(item.id)
                                  }
                                >
                                  <i class="bx bxs-check-circle"></i>
                                </button>
                                <div className="complete-button">
                                  <span
                                    style={{
                                      textDecoration: textDecoration,
                                      color: textColor,
                                    }}
                                    className="mb-1"
                                  >
                                    {item.title}
                                  </span>
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      color: textColor,
                                      display: display,
                                    }}
                                    className=""
                                  >
                                    completed
                                  </span>
                                </div>
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
              )}
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

                {/* <div className="my-3">
                  <label htmlFor="">Status</label>
                  <select
                    name="status"
                    value={input.status}
                    onChange={this.handleInputChange}
                    className="form-select"
                  >
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                  </select>
                </div> */}

                <div className="my-3 mt-4">
                  <button className="btn btn-primary border-0 me-2 add-task">
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </TodoModal>
        )}
      </div>
    );
  }
}

export default Todo;
