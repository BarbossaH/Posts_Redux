import { useSelector } from 'react-redux';
import { getAllUsersState } from '../store/userSlice';

const PostAuthor = ({ userId }) => {
  const users = useSelector(getAllUsersState);
  // console.log(userId);
  const user = users.find((user) => user.id == userId);
  // console.log(user);
  return <span>{user ? `by ${user.name}` : 'Unknown Author'}</span>;
};
export default PostAuthor;
