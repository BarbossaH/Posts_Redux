import PostAuthor from './PostAuthor';
import PostTimeAgo from './PostTimeAgo';
import PostReaction from './PostReaction';

const PostExcerpt = ({ post }) => {
  // console.log(post);
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
        <PostAuthor userId={post.userId} />
      </p>
      <p>
        <PostTimeAgo timeStamp={post.date} />
      </p>
      <p>
        <PostReaction post={post} />
      </p>
    </article>
  );
};
export default PostExcerpt;
