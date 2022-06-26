import { Close, SendSharp } from '@mui/icons-material';
import { Modal, Grid, Stack, Avatar, Typography, TextField, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'

import StoryFooter from '../components/Story/StoryFooter';
import { createComment, fetchComments } from '../redux/comments/commentSlice';
import { useAppDispatch, useAppSelector } from '../redux/configureStore';
import { incrementCommentsCounter, StoryType } from '../redux/stories/storySlice';


interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  story: StoryType;
}

const gridItemSpacing = {
  pt: 10, pl: 5, pr: 8
}

const StoryShowModal = ({ story, open, setOpen }: IProps) => {
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector(state => state.comments);
  const { profilePic, id: userId } = useAppSelector(state => state.user.userInfo);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!open) return;
    dispatch(fetchComments(story.id));
  }, [open])


  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(createComment({ content: comment, postId: story.id, userId }));
    dispatch(incrementCommentsCounter(story.id));
    setComment('');
  }

  return (
    <Modal open={open} onClose={() => { setOpen(false) }} sx={{ display: 'grid', placeContent: 'center' }}>
      <Grid container
        sx={{
          width: { lg: '1500px' }, height: { lg: '750px' }, bgcolor: 'background.paper', borderRadius: '25px',
          position: 'relative'
        }}
      >
        <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', top: '25px', right: '25px', color: 'grey.900' }} >
          <Close color='inherit' fontSize='large' />
        </IconButton>
        <Grid item xs={6} sx={{ borderRight: '1px solid', borderColor: 'grey.900', ...gridItemSpacing }}>
          <Stack sx={{ width: '100%', height: '100%' }}>
            <Stack columnGap={3} direction="row" alignItems="center" sx={{ mb: 2.5 }}>
              <Avatar src={story.user.profilePic} alt="Avatar" />
              <Stack>
                <Typography variant="subtitle1" sx={{ fontWeight: '700' }}>{story.user.name}</Typography>
                <Typography variant="subtitle2">{story.category}</Typography>
              </Stack>
            </Stack>
            <Typography sx={{ mb: 'auto', wordBreak: 'break-word' }} >
              {story.content}
            </Typography>
            <StoryFooter likesCounter={story.likesCounter} commentsCounter={story.commentsCounter} postId={story.id} />
          </Stack>
        </Grid>

        <Grid item xs={6} sx={{ ...gridItemSpacing, pr: 14 }}>
          <Stack sx={{ width: '100%', height: '100%' }}>
            <Stack rowGap={4} sx={{ overflowY: 'auto', flexGrow: 5, height: '500px', pr: 1 }}>
              {comments.length > 0 ? (
                comments.map(comment => (
                  <Stack key={comment.id} direction="row" columnGap={2}>
                    <Avatar src={comment.user.profilePic} alt="Avatar" />
                    <Stack sx={{ bgcolor: 'grey.100', py: 2, px: 2.5, borderRadius: '10px' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: '700' }}>{comment.user.name}</Typography>
                      <Typography variant="body1" component="pre">{comment.content}</Typography>
                    </Stack>
                  </Stack>
                ))
              ) : (
                <Typography variant="h6" sx={{ textAlign: 'center' }}>No comments yet, Be the first</Typography>
              )}
            </Stack>
            <form style={{ marginTop: 'auto', paddingBlock: '12px' }} onSubmit={handleSubmit}>
              <Stack columnGap={2} direction="row" alignItems="center">
                <Avatar src={profilePic} alt="Avatar" />
                <TextField fullWidth placeholder='Write a comment....'
                  variant="outlined" size='small' sx={{ bgcolor: 'grey.100' }} required
                  value={comment} onChange={e => setComment(e.target.value)}
                  multiline
                  maxRows={4}
                />
                <IconButton
                  aria-label="add comment"
                  type="submit"
                >
                  <SendSharp />
                </IconButton>
              </Stack>
            </form>
          </Stack>
        </Grid>
      </Grid>
    </Modal >
  )
}

export default StoryShowModal