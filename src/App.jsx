import { useEffect, useState } from "react";
import axios from "axios";
import api from "./utils/api";
import ListItem from "./components/ListItem";
import From from "./components/From";
import { toast } from "react-toastify";

const App = () => {
  const [todos, setTodos] = useState(null);
  useEffect(() => {
    const params = { _sort: "-date", _page: 1 };
    api
      .get("/todos", { params })
      .then((res) => setTodos(res.data.data))
      .catch((error) => toast.error("Bir sorun oluştu"));
  }, []);

  return (
    <div className="bg-dark min-vh-100  text-light">
      <div className="container py-5">
        <h2 className="text-center mb-5">
          Server <span className="text-warning">CRUD</span>
        </h2>
        <From setTodos={setTodos} />
        <ul className="list-group">
          {!todos ? (
            <div className="loader"></div>
          ) : (
            todos.map((todo) => (
              <ListItem key={todo.id} todo={todo} setTodos={setTodos} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
export default App;
