import { useLoaderData } from "react-router-dom";
import { getPosts } from "../api/posts";
import { PostCard } from "../components/PostCard";

function PostList() {
  const posts = useLoaderData();

  return (
    <>
      <h1 className="page-title">Posts</h1>

      <div className="card-grid">
        {posts.map((post) => {
          return (
            // <div key={post.id} className="card">
            //   <div className="card-header">{post.title}</div>
            //   <div className="card-body">
            //     <div className="card-preview-text">{post.body}</div>
            //   </div>
            //   <div className="card-footer">
            //     <Link className="btn" to={`/posts/${post.id}`}>
            //       View
            //     </Link>
            //   </div>
            // </div>

            <PostCard key={post.id} {...post} />
          );
        })}
      </div>
    </>
  );
}

// function loader({ request: { signal } }) {
//   return axios
//     .get("http://localhost:3000/posts", { signal })
//     .then((res) => res.data);
// }

function loader({ request: { signal } }) {
  return getPosts(signal);
}

export const postListRoute = {
  loader,
  element: <PostList />,
};
