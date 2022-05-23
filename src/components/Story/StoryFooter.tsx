/* eslint-disable unicorn/consistent-function-scoping */
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Box, Button, Divider, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../redux/configureStore';
import { decrementLikesCounter, incrementLikesCounter } from '../../redux/stories/storySlice';
import { likePost, unlikePost } from '../../redux/users/users';


interface IProps {
  likesCounter: number;
  commentsCounter: number;
  postId: number;
  setStoryShowModalOpen?: (open: boolean) => void;
}

const StoryFooter = ({ likesCounter, commentsCounter, postId, setStoryShowModalOpen }: IProps) => {
  const user = useAppSelector(state => state.user);
  const { likedPosts } = user;
  const dispatch = useAppDispatch();

  const isLiked = () => {
    return likedPosts.some(likedPost => likedPost.postId === postId);
  }

  const handleLikeClick = () => {
    if (isLiked()) {
      const like = likedPosts.find(likedPost => likedPost.postId === postId)
      if (like) {
        dispatch(unlikePost(like.likeId))
        dispatch(decrementLikesCounter(postId));
      }
    } else {
      dispatch(likePost({ userId: user.userInfo.id, postId }));
      dispatch(incrementLikesCounter(postId));
    }
  }

  return (
    <Box>
      <Typography variant="body2" sx={{ color: 'grey.900', fontWeight: '700' }}>
        {likesCounter} {likesCounter == 1 ? 'Like' : 'Likes'}, {commentsCounter} {commentsCounter == 1 ? 'Comment' : 'Comments'}
      </Typography>
      <Divider sx={{ mt: 1, bgcolor: 'grey.900' }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 1 }}>
        <Button
          startIcon={<ThumbUpAltIcon />}
          color={isLiked() ? 'primary' : 'inherit'}
          sx={{ fontWeight: '700' }}
          onClick={handleLikeClick}
        >
          Like
        </Button>
        <Button
          startIcon={<ChatBubbleOutlineIcon />}
          color="inherit"
          sx={{ fontWeight: '700' }}
          onClick={() => !!setStoryShowModalOpen && setStoryShowModalOpen(true)}
        >
          Comment
        </Button>
      </Box>
    </Box>
  )
}

export default StoryFooter