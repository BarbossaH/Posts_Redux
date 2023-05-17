import PostAuthor from './PostAuthor';
import PostTimeAgo from './PostTimeAgo';
import PostReaction from './PostReaction';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getPostById } from '../store/postSlice';

const PostSinglePage = () => {
  const { postId } = useParams();
  // console.log(postId);
  const post = useSelector((state) => getPostById(state, postId));
  if (!post) return <p>this post doesn't exist.</p>;

  return (
    <article key={post.id}>
      <h3
        style={{
          color: 'red',
        }}
      >
        {post.title}
      </h3>
      {/* <p>{post.body}</p> */}
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <PostTimeAgo timeStamp={post.date} />
      </p>

      <p>
        <PostReaction post={post} />
      </p>
    </article>
  );
};
export default PostSinglePage;
