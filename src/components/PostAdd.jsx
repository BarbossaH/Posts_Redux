import { useState } from 'react';
import { addPost } from '../store/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersState } from '../store/userSlice';

const PostAdd = () => {
  // console.log('post add component is changed');
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleOptionChange = (e) => setUserId(e.target.value);
  const handleAddPost = (e) => {
    // add an object including id, title,content,we need to create this obj first
    // const newPost = {
    //   id: nanoid(),
    //   title,
    //   content,
    // };
    dispatch(addPost(title, content, userId));
    setContent('');
    setTitle('');
    setUserId('');
  };
  const users = useSelector(getAllUsersState);
  const usersOption = users.map((user) => (
    <option key={user.id} value={user.id}>
      {/* {console.log(user.id)} */}
      {user.name}
    </option>
  ));

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);
  return (
    <section>
      <h2>Add a new Post</h2>
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
        <select name="postAuthor" id="postAuthor" onChange={handleOptionChange}>
          <option value=""></option>
          {usersOption}
        </select>
        <label htmlFor="postContent">Post Content</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={handleContentChange}
        />
        <button type="button" onClick={handleAddPost} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};
export default PostAdd;
