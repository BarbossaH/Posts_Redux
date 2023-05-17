import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PostAdd from './components/PostAdd';
import Posts from './components/Posts';
import PostSinglePage from './components/PostSinglePage';
import PostEdit from './components/PostEdit';

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
      </Routes>
    </Layout>
  );
}

export default App;
