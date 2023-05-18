import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getUserByIdState } from '../store/userSlice';
import { getAllPostsState, getPostsByUser } from '../store/postSlice';

const UserPage = () => {
  console.log('I am rerendered');
  const { userId } = useParams();
  const user = useSelector((state) => getUserByIdState(state, userId));

  //in this performance test, the state of count is one of the post states, so when count changed, the whole states will affect the other components mounted
  // const postsForUser = useSelector((state) => {
  //   const allPosts = getAllPostsState(state);
  //   //return posts will cause to rerender this component, if just return allPosts, it won't
  //   const posts = allPosts.filter((post) => post.userId === Number(userId));
  //   return posts;
  //   // return 'ok';
  // });

  const postsForUser = useSelector((state) =>
    getPostsByUser(state, Number(userId))
  );
  const renderedPostTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));
  return (
    <div>
      {/* test */}
      <h2>{user?.name}</h2>
      <ol>{renderedPostTitles}</ol>
    </div>
  );
};
export default UserPage;
