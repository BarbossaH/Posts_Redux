import PostAuthor from './PostAuthor';
import PostTimeAgo from './PostTimeAgo';
import PostReaction from './PostReaction';
import { Link } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { getPostById } from '../store/postSlice';

// const PostExcerpt = React.memo(....) using this to manage the component
// let PostExcerpt = ({ post }) => {
const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => getPostById(state, postId));
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
      <p className="excerpt">{post.body.substring(0, 75)}</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post </Link>
        <PostAuthor userId={post.userId} />
        <PostTimeAgo timeStamp={post.date} />
      </p>
      <p>
        <PostReaction post={post} />
      </p>
    </article>
  );
};
// PostExcerpt = React.memo(PostExcerpt);
export default PostExcerpt;
