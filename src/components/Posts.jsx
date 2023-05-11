import { useSelector } from 'react-redux';
import { getAllPostsState } from '../store/postSlice';

const Posts = () => {
  const posts = useSelector(getAllPostsState);
  console.log(posts);

  const renderedPosts = posts.map((post) => (
    <article key={post.id}>
      <h3
        style={{
          color: 'red',
        }}
      >
        {post.title}
      </h3>
      <p>{post.content}</p>
      {/* <p>{post.content.substring(0,100)}</p> */}
    </article>
  ));
  return (
    <div>
      <h2>POSTS</h2>
      {renderedPosts}
    </div>
  );
};
export default Posts;
