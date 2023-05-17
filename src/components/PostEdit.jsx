import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deletePost,
  getAllPostsState,
  getPostById,
  updatePost,
} from '../store/postSlice';
import { getAllUsersState } from '../store/userSlice';
import { useState } from 'react';

const PostEdit = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = useSelector((state) => getPostById(state, postId));
  // console.log(post, postId);
  const users = useSelector(getAllUsersState);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [reqStatus, setReqStatus] = useState('idle');
  const dispatch = useDispatch();

  if (!post) {
    return (
      <section>
        <h2> Post doesn't exist</h2>
      </section>
    );
  }

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleOptionChange = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && reqStatus === 'idle';
  const handleSavePost = () => {
    if (canSave) {
      try {
        setReqStatus('pending');
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();
        setTitle('');
        setContent('');
        setUserId('');
        navigate(`/post/${postId}`);
      } catch (error) {
        console.error('Failed to save the post', error);
      } finally {
        setReqStatus('idle');
      }
    }
  };
  const userOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));

  const handleDeletePost = () => {
    try {
      setReqStatus('pending');
      dispatch(deletePost({ id: post.id })).unwrap();
      setTitle('');
      setContent('');
      setUserId('');
      navigate('/');
    } catch (error) {
      console.error('Failed to delete the post', error);
    } finally {
      setReqStatus('idle');
    }
  };
  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="postAuthor">Post Author</label>
        <select
          name="postAuthor"
          id="postAuthor"
          value={userId}
          onChange={handleOptionChange}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Post Content</label>
        <textarea
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={handleContentChange}
        />
        <button type="button" onClick={handleSavePost} disabled={!canSave}>
          Save Post
        </button>
        <button
          className="deleteButton"
          type="button"
          onClick={handleDeletePost}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};
export default PostEdit;
