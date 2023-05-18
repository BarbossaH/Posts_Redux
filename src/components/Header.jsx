import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountState, increaseCount } from '../store/postSlice';

const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCountState);
  return (
    <header className="Header">
      <h1>Redux Practice</h1>
      <nav>
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'post'}>Post</Link>
          </li>
          <li>
            <Link to={'user'}>Users</Link>
          </li>
        </ul>
        <button onClick={() => dispatch(increaseCount())}>{count}</button>
      </nav>
    </header>
  );
};
export default Header;
