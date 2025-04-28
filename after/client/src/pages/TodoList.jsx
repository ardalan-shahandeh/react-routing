import { useLoaderData } from "react-router-dom";
import { getTodos } from "../api/todos";
import { TodoItem } from "../components/TodoItem";

function TodoList() {
  const todos = useLoaderData();
  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        {todos.map((todo) => (
          // <li
          //   key={todo.id}
          //   className={todo.completed ? "strike-through" : undefined}
          // >
          //   {todo.title}
          // </li>
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
}

function loader({ request: { signal } }) {
  return getTodos(signal);
}
export const TodoListRoute = {
  loader,
  element: <TodoList />,
};
