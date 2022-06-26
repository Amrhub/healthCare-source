/* eslint-disable unicorn/consistent-function-scoping */
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Box, Button, Divider, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../redux/configureStore';
import { likePost, unlikePost, getPostsUserLike } from '../../redux/stories/storySlice';


interface IProps {
  likesCounter: number;
  commentsCounter: number;
  postId: number;
  setStoryShowModalOpen?: (open: boolean) => void;
}

const StoryFooter = ({ likesCounter, commentsCounter, postId, setStoryShowModalOpen }: IProps) => {
  const user = useAppSelector(state => state.user);
  const { likedPosts } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  const isLiked = () => {
    return likedPosts.some(likedPost => likedPost.postId === postId);
  }

  const handleLikeClick = () => {
    if (isLiked()) {
      const like = likedPosts.find(likedPost => likedPost.postId === postId)
      if (like) {
        dispatch(unlikePost({ likeId: like.likeId, postId }))
        dispatch(getPostsUserLike(user.userInfo.id))
      }
    } else {
      dispatch(likePost({ userId: user.userInfo.id, postId }));
      dispatch(getPostsUserLike(user.userInfo.id))
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