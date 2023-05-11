import { useState } from 'react';
import { addPost } from '../store/postSlice';
import { useDispatch } from 'react-redux';

const PostAdd = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleAddPost = () => {
    // add an object including id, title,content,we need to create this obj first
    // const newPost = {
    //   id: nanoid(),
    //   title,
    //   content,
    // };
    dispatch(addPost(title, content));
    setContent('');
    setTitle('');
  };
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
        <label htmlFor="postContent">Post Content</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={handleContentChange}
        />
        <button type="button" onClick={handleAddPost}>
          Save Post
        </button>
      </form>
    </section>
  );
};
export default PostAdd;
