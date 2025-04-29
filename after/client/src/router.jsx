import { createBrowserRouter, Navigate, useRouteError } from "react-router-dom";
import { postListRoute } from "./pages/PostList";
import { UserListRoute } from "./pages/UserList";
import { TodoListRoute } from "./pages/TodoList";
import { postRoute } from "./pages/Post";
import { RootLayout } from "./layouts/RootLayout";
import { userRoute } from "./pages/User";
import { newPostRoute } from "./pages/NewPost";
import { editPostRoute } from "./pages/EditPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="/posts" /> },
          {
            path: "posts",
            children: [
              {
                index: true,
                ...postListRoute,
              },
              {
                path: ":postId",
                children: [
                  { index: true, ...postRoute },
                  { path: "edit", ...editPostRoute },
                ],
              },
              { path: "new", ...newPostRoute },
            ],
          },
          {
            path: "users",
            children: [
              {
                index: true,
                ...UserListRoute,
              },
              { path: ":userId", ...userRoute },
            ],
          },
          {
            path: "todos",
            ...TodoListRoute,
          },
        ],
      },
    ],
  },
]);

function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <h1>Error</h1>;<pre>{error.message}</pre>
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}
