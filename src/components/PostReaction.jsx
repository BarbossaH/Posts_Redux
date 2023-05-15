import { useDispatch } from 'react-redux';
// import { reactionAdd } from '../store/postSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};
const PostReaction = ({ post }) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        style={{ color: 'purple' }}
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(reactionAdd({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });
  return <span>{reactionButtons}</span>;
};
export default PostReaction;
