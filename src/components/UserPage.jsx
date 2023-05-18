import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getUserByIdState } from '../store/userSlice';
import { getAllPostsState } from '../store/postSlice';

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => getUserByIdState(state, userId));

  const postsForUser = useSelector((state) => {
    const allPosts = getAllPostsState(state);
    return allPosts.filter((post) => post.userId === Number(userId));
  });

  const renderedPostTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));
  return (
    <div>
      <h2>{user?.name}</h2>
      <ol>{renderedPostTitles}</ol>
    </div>
  );
};
export default UserPage;
