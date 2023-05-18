import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PostAdd from './components/PostAdd';
import Posts from './components/Posts';
import PostSinglePage from './components/PostSinglePage';
import PostEdit from './components/PostEdit';
import UserList from './components/UserList';
import UserPage from './components/UserPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Posts />}></Route>
        <Route path="post">
          <Route index element={<PostAdd />} />
          <Route path=":postId" element={<PostSinglePage />} />
          <Route path="edit/:postId" element={<PostEdit />} />
        </Route>
        <Route path="user">
          <Route index element={<UserList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>
        {/* if user input the wrong address, it will be navigated to the home page to replace with the 404 page or component */}
        <Route path="*" element={<Navigate to={'/'} replace />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
