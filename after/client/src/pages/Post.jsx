import { Link, useLoaderData } from "react-router-dom";
import { getComments, getPost } from "../api/posts";
import { getUser } from "../api/users";

function Post() {
  const { post, comments, user } = useLoaderData();

  return (
    <>
      <h1 className="page-title">{post.title}</h1>
      <div className="title-btns">
        <Link className="btn btn-outline" to="edit">
          Edit
        </Link>
      </div>
      <span className="page-subtitle">
        By: <Link to={`users/${user.id}`}>{user.name}</Link>
      </span>

      <div>{post.body}</div>

      <h3 className="mt-4 mb-2">Comments</h3>

      <div className="card-stack">
        {comments.map((comment) => (
          <div className="card">
            <div className="card-body">
              <div className="text-sm mb-1">{comment.email}</div>
              {comment.body}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

async function loader({ request: { signal }, params: { postId } }) {
  const comments = getComments(postId, { signal });
  const post = await getPost(postId, { signal });
  const user = getUser(post.userId, { signal });

  return {
    comments: await comments,
    post,
    user: await user,
  };
}

export const postRoute = {
  loader,
  element: <Post />,
};
