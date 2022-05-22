import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Box, Button, Divider, Typography } from '@mui/material';


interface IProps {
  likesCounter: number;
  commentsCounter: number;
}

const StoryFooter = ({ likesCounter, commentsCounter }: IProps) => {
  return (
    <Box>
      <Typography variant="body2" sx={{ color: 'grey.900', fontWeight: '700' }}>
        {likesCounter} {likesCounter == 1 ? 'Like' : 'Likes'}, {commentsCounter} {commentsCounter == 1 ? 'Comment' : 'Comments'}
      </Typography>
      <Divider sx={{ mt: 1, bgcolor: 'grey.900' }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 1 }}>
        <Button
          startIcon={<ThumbUpAltIcon />}
          color="inherit"
          sx={{ fontWeight: '700' }}
        >
          Like
        </Button>
        <Button
          startIcon={<ChatBubbleOutlineIcon />}
          color="inherit"
          sx={{ fontWeight: '700' }}
        >
          Comment
        </Button>
      </Box>
    </Box>
  )
}

export default StoryFooter