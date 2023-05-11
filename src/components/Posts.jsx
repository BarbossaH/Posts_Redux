import { useSelector } from 'react-redux';
import { getAllPostsState } from '../store/postSlice';
import PostAuthor from './PostAuthor';
import PostTimeAgo from './PostTimeAgo';
import PostReaction from './PostReaction';

const Posts = () => {
  const posts = useSelector(getAllPostsState);

  const orderedPosts = posts
    .slice() //copy the array from the 0 to the end
    .sort((a, b) => b.date.localeCompare(a.date));
  console.log(orderedPosts);

  const renderedPosts = orderedPosts.map((post) => (
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
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
      </p>
      <p>
        <PostTimeAgo timeStamp={post.date} />
      </p>
      <p>
        <PostReaction post={post} />
      </p>
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
