import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Todo from "./Components/ToDo/Todo";
import Edit from "./pages/Edit/Edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
