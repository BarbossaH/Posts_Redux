import { parseISO, formatDistanceToNow } from 'date-fns';

const PostTimeAgo = ({ timeStamp }) => {
  // console.log(timeStamp);
  let timeAgo = '';
  if (timeStamp) {
    const date = parseISO(timeStamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
    // console.log(timeAgo);
  }
  return (
    <span title={timeStamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};
export default PostTimeAgo;
