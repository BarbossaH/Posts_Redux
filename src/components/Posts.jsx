import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  getAllPostsError,
  getAllPostsState,
  getAllPostsStatus,
} from '../store/postSlice';

import { useEffect } from 'react';
import PostExcerpt from './PostExcerpt';

const Posts = () => {
  const dispatch = useDispatch();

  const posts = useSelector(getAllPostsState);
  const postStatus = useSelector(getAllPostsStatus);
  const error = useSelector(getAllPostsError);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus]);

  const orderedPosts = posts
    .slice() //copy the array from the 0 to the end
    .sort((a, b) => b.date.localeCompare(a.date));
  // console.log(orderedPosts);

  let content;
  if (postStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (postStatus === 'succeeded') {
    content = orderedPosts.map((post) => (
      <PostExcerpt post={post} key={post.id} />
      // <article key={post.id}>
      //   <h3
      //     style={{
      //       color: 'red',
      //     }}
      //   >
      //     {post.title}
      //   </h3>
      //   <p>{post.content}</p>
      //   {/* <p>{post.content.substring(0,100)}</p> */}
      //   <p className="postCredit">
      //     <PostAuthor userId={post.userId} />
      //   </p>
      //   <p>
      //     <PostTimeAgo timeStamp={post.date} />
      //   </p>
      //   <p>
      //     <PostReaction post={post} />
      //   </p>
      // </article>
    ));
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>;
  }
  return (
    <div>
      {/* <h2>POSTS</h2> */}
      {content}
    </div>
  );
};
export default Posts;
